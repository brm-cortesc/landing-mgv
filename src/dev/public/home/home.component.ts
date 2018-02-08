import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
 	
 	public jovenesForm: any = {};
  public formSubmitAttempt: boolean = false;

  constructor() { }

  ngOnInit() {}

  focusIn(event){
    let el = event.srcElement;
    let parent = el.parentNode;     
    let valor = el.value


    if (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA'){
      parent.parentNode.classList.add('active')
    }else{

        parent.classList.add('active')
    }

  }

  focusOut(event){
    let el = event.srcElement;
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
  }


}
