import { Component, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.services';
import { DOCUMENT } from '@angular/platform-browser';
import {WINDOW } from "../../services/window.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
 	
  public msgAlerta: string = "";
 	public jovenesForm: any = {};
  public formSubmitAttempt: boolean = false;
  public fileUpload: File;
  public departamentos: any;
  public ciudades: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private requestService: RequestService,
    
    ) { }

  ngOnInit() {
    /* Trae de base de datos Servicio noticias */
    this.requestService.post('app.php',{accion:"getDepartamentos"})
    .subscribe(
    (result) => {
      //this.toast.closeLoader();
      switch (result.error) {
        case 0:
          console.log("Los datos son incorrectos");
          break;
        case 1:
          this.departamentos = result.data;
          this.departamentos.unshift({id:'',nombre:''});
          break;
      }
    },
    (error) =>  {
      //this.toast.closeLoader();
      console.log(error)
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
      this.fileUpload = fileList[0];
    }
  }

  getCiudades(e,update:any = false){
    var idDepartamento;
    if (update) {
      idDepartamento = e;
    }else{
      let selectElement = e.target;
      var stateIndex = selectElement.selectedIndex;
      idDepartamento = selectElement.options[stateIndex].value;
    }
    // Trae las ciudades de la bd
    this.requestService.post('app.php',{accion:"getCiudades",idDepartamento:idDepartamento})
      .subscribe(
      (result) => {
        //this.toast.closeLoader();
        switch (result.error) {
          case 0:
            //this.toast.openToast("Ocurrió un error",null,5,null);
            break;
          case 1:
            this.ciudades = result.data;
            this.ciudades.unshift({id:'',name:''});
            break;
        }
      },
      (error) =>  {
        //this.toast.closeLoader();
        console.log(error)
      });
  }

  save(jovenes){
    this.formSubmitAttempt = true;
    let ancho = this.window.screen.width;

    if (jovenes.form.valid) {
      let formData:FormData = new FormData();
      if (this.fileUpload != undefined) {
        formData.append('archivo', this.fileUpload, this.fileUpload.name);
      }
      //formData.append('categorias', JSON.stringify(categoriasActivas));
      formData.append('nombre', this.jovenesForm.nombre);
      formData.append('apellido', this.jovenesForm.apellido);
      formData.append('telefono', this.jovenesForm.telefono);
      formData.append('correo', this.jovenesForm.correo);
      formData.append('departamento', this.jovenesForm.departamento);
      formData.append('idCiudad', this.jovenesForm.idCiudad);
      formData.append('facebook', (this.jovenesForm.facebook != undefined) ? this.jovenesForm.facebook : "" );
      formData.append('instagram', (this.jovenesForm.instagram != undefined) ? this.jovenesForm.instagram : "" );
      formData.append('twitter', (this.jovenesForm.twitter != undefined) ? this.jovenesForm.twitter : "" );
      formData.append('condiciones', this.jovenesForm.condiciones);
      formData.append('politicas', this.jovenesForm.politicas);
      formData.append('comentario', (this.jovenesForm.comentario != undefined) ? this.jovenesForm.comentario : "" );
      formData.append('accion', 'setRegistroPropuesta');

      this.requestService.post('app.php', formData, true)
        .subscribe(
        (result) => {
          switch (result.error) {
            case 0:
              this.alerta("Ocurrió un error");
              break;
            case 1:
              this.formSubmitAttempt = false;
              jovenes.reset();
              this.jovenesForm = {};
              this.alerta("Gracias por tu mensaje.");
              break;
            case 2:
              this.alerta("Ocurrió un error al realizar el registro.");
              break;
            case 3:
              this.alerta("Ocurrió un error al subir el archivo.");
              break;
            case 3:
              this.alerta("datos request incorrectos.");
              break;
          }
        },
        (error) =>  {
          console.log(error)
        });
    }else{

      if(ancho < 768 ){
        this.document.body.scrollTop = 300;
        this.document.documentElement.scrollTop = 300;
      }
    
    }
  }

  alerta(msg){
    this.msgAlerta = msg;
    setTimeout(()=>{
      this.msgAlerta = "";
    },5000);
  }

  focusIn(event){
    let el = event.srcElement || event.target;
    // console.log(event.target)
    let parent = el.parentNode;     
    let valor = el.value
    if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.add('active')
    }else{
      parent.classList.add('active')
    }
  }

  focusOut(event){
    let el = event.srcElement || event.target;

    let parent = el.parentNode;  
    let valor = el.value;
    if (valor != '' ){
      if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.add('active')
      }else{
          parent.classList.add('active')


      }
    }else{
      if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
        parent.parentNode.classList.remove('active')
      }else{
          parent.classList.remove('active')
      }

    }

    if(valor == 0 && valor == '' ){
       parent.classList.add('active')
    }
  }


}
