import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { RequestService } from '../../services/request.services';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from "../../services/window.service";
import { WindowRef } from '../../services/windowRef.service';


//componentes de bootstrap
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnInit {
 	
  public msgAlerta: string = "";
 	public jovenesForm: any = {};
  public formSubmitAttempt: boolean = false;
  public fileUpload: File;
  public departamentos: any;
  public ciudades: any;
  public closeResult: string;
  public cargador: boolean = false;
  public nativeWindow: any;
  public player:any;
  


  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private winRef: WindowRef,
    private requestService: RequestService,
    private modalService: NgbModal
    ) { 
      this.nativeWindow = winRef.getNativeWindow();
      this.document.body.scrollTop = 0;
      this.document.documentElement.scrollTop = 0;
    }

   //**insertamos tag de iframe api después de iniciar la vista//
  ngAfterViewInit(){
    const doc = (<any>window).document;
      let playerApiScript = doc.createElement('script');
      playerApiScript.type = 'text/javascript';
      playerApiScript.src = 'https://www.youtube.com/iframe_api';
      doc.body.prepend(playerApiScript);

  }

  ngOnInit() {
   
    //*creamos el objeto de youtube*//
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('vidYT', {
        height: '100%',
        width: '100%',
        videoId: 'ngI2rHhKozk',
        playerVars: {'autoplay': 1, 'rel': 0, 'controls': 2},
        events: {
          'onReady': () => {
            console.log('listo')
          },
          'onStateChange': (event) => {
               let done = false;
               let scrollTo = (element, to, duration) => {
                   if (duration <= 0) return;
                   var difference = to - element.scrollTop;
                   var perTick = difference / duration * 10;
     

                   setTimeout(function() {
                       element.scrollTop = element.scrollTop + perTick;
                       if (element.scrollTop === to) return;
                       scrollTo(element, to, duration - 10);
                   }, 10);
               }
             if(event.data == (<any>window).YT.PlayerState.ENDED && !done ){
               console.log('video termino')
               done = true;


              let body = this.document.body || this.document.documentElement;
              let posicion = this.document.getElementById('youth');

              scrollTo( this.document.documentElement, posicion.offsetTop - 150, 600 );
               

             }

          }
        }
      });
    };
    
    
    /* Trae de base de datos Servicio departamentos */
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

  //Funcion de la modal
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      location.reload();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  
  
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.fileUpload = fileList[0];
    }else{
      this.fileUpload = null;
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

  save(jovenes, idModal){
    this.formSubmitAttempt = true;
    let ancho = this.window.screen.width;

    if (jovenes.form.valid) {
      this.cargador = true;
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
          this.cargador = false;
          switch (result.error) {
            case 0:
              this.alerta("Ocurrió un error");
              break;
            case 1:
              this.formSubmitAttempt = false;
              jovenes.reset();
              this.document.body.scrollTop = 0;
              this.document.documentElement.scrollTop = 0;
              this.jovenesForm = {};
              // this.alerta("Gracias por tu mensaje.");
              this.open(idModal);
              var fileDownload = "https://www.mejorjovenes.com/server/assets/conviertete-en-un-gerente-joven.pdf";
              var fileName = "conviertete-en-un-gerente-joven.pdf";
              this.saveToDisk(fileDownload, fileName);
              break;
            case 2:
              this.alerta("Ocurrió un error al realizar el registro.");
              break;
            case 3:
              this.alerta("Ocurrió un error al subir el archivo.");
              break;
            case 4:
              this.alerta("Datos request incorrectos.");
              break;
            case 5:
              this.alerta("El peso del archivo no es correcto");
              break;
            case 6:
              this.alerta("Ocurrió un error al subir el archivo");
              break;
          }
        },
        (error) =>  {
          this.cargador = false;
          console.log(error)
        });
    }else{

      // if(ancho < 768 ){
        this.document.body.scrollTop = 300;
        this.document.documentElement.scrollTop = 300;
      // }
    
    }
  }

  alerta(msg){
    this.msgAlerta = msg;
    setTimeout(()=>{
      this.msgAlerta = "";
    },5000);
  }
  
  saveToDisk(fileDownload, fileName){
    var a = document.createElement('a');
    a.href = fileDownload;
    a.target = '_parent';
    // Use a.download if available, it prevents plugins from opening.
    if ('download' in a) {
      a.download = fileName;
    }
    // Add a to the doc for click to work.
    (document.body || document.documentElement).appendChild(a);
    if (a.click) {
      a.click(); // The click method is supported by most browsers.
    } else {
      //$(a).click(); // Backup using jquery
    }
    // Delete the temporary link.
    a.parentNode.removeChild(a);
    return true;
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

  // savePlayer (player){
  //   this.player = player;
  //   console.log( `instancia: ${player}` )
  // }

  // onStateChange(event){
  //   console.log( `estado del player: ${event.data}` )

  // }


}
