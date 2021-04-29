'use strict';



class ImgLazy extends HTMLElement{

    static get observedAttributes(){
        return ['src','lazy']
    }

    static get ATTR_LAZY(){return new Set(['true', 'false', ''])}

    get lazy(){ return this.getAttribute("lazy")}
    set lazy(v){this.setAttribute("lazy", v)}
    
    get src(){ return this.getAttribute("src")}
    set src(v){this.setAttribute("src", v)}
  
     constructor(){
        super()

        //#region Root
        this.root       = this.attachShadow({mode: 'open'})
        this.root.placeholder = new Placeholder()     // zIndex 20
        this.root.image = new Image()                              // zIndex 10
        this.root.style = document.createElement('link')

        //style
        this.root.style.setAttribute('rel','stylesheet')
        this.root.style.setAttribute('href','img.css')

        this.root.appendChild(this.root.style)


        //placeholder
        this.root.appendChild(this.root.placeholder)

        //img
        this.root.appendChild(this.root.image   )

        
        //#endregion

        //#region Fields        
            this._src = this.src
            this._isLazy = false

                    
        //#endregion
        
        
    }

    connectedCallback(){
        this.addEventListener()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'src':{
                if(this._isLazy)
                    this.removeAttribute("src")

                break
            }

            case 'lazy':{
                if(!ClassName.ATTR_LAZY.has(newValue)) return console.error('Can be setted only value: ', ClassName.ATTR_LAZY)

                if(newValue == "true" || newValue == ""){
                    this._isLazy = true
                }
                else if(newValue == "false"){
                    this._isLazy = false
                }


                break
            }
            /*case 'attr':{
                if(!ClassName.ATTR.has(newValue)) return console.error('Can be setted only value: ', ClassName.ATTR)

                if(newValue == "true" || newValue == ""){
                    //
                }
                else if(newValue == "false"){
                    //
                }

                break;
            }*/
        }
    }

    //#region Private
    
        addEventListener(){
            this.root.image.onload = this.loaded.bind(this)
            
        }

        load(){
            console.debug('Loading image...',this.root)
            this.showPlaceholder()
            this.root.image.src = this._src
        }

        loaded(){
            // debugger
            console.debug('Image loaded',this.root)
            this.hidePlaceholder()
        }


        showPlaceholder(){
            console.debug('Show placeholder',this.root)
            this.root.placeholder.loading = true
        }
        hidePlaceholder(){
            console.debug('Hide placeholder',this.root)
            this.root.placeholder.loading = false
        }

    //#endregion

    //#region Methods
    //#endregion
}

    
customElements.define('img-custom', ImgLazy)
