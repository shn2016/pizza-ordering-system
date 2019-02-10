import clearNode from "../helper/clearNode";

export default class BaseComponent {

    setState(newState){
        this.state = {
          ...this.state,
          ...newState,
        };
        this.enhancedRender();
      }

    enhancedRender(rootElement){
      const result = this.render();
  
      if(rootElement) {
        this.rootElement = rootElement;
      }
  
      clearNode(this.rootElement);    
      this.rootElement.append(result);
    }
}