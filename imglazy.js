'use strict';



class ImgLazy extends HTMLElement{

    static get observedAttributes(){
        return ['src','lazy','placeholder','width', 'height']
    }

    static get ATTR_LAZY(){return new Set(['true', 'false', ''])}
    static get ATTR_PLACEHOLDER(){return new Set(['true', 'false', ''])}

    get lazy(){ return this.getAttribute("lazy")}
    set lazy(v){this.setAttribute("lazy", v)}
    
    get placeholder(){ return this.getAttribute("placeholder")}
    set placeholder(v){this.setAttribute("placeholder", v)}
    
    get src(){ return this.getAttribute("src")}
    set src(v){this.setAttribute("src", v)}
  
    get width(){ return this.getAttribute("width")}
    set width(v){ this.setAttribute("width", v)}
    
    get height(){ return this.getAttribute("height")}
    set height(v){ this.setAttribute("height", v)}

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
        this.root.image.classList.add('hidden')
        this.root.appendChild(this.root.image)

        
        //#endregion

        //#region Fields        
            this._src = this.src
            this._isLoaded = false
            this._isLazy = false
            this._isPlaceholderShowable = true

                    
        //#endregion
        
        
    }

    connectedCallback(){
        this.load()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'src':{
                if(this._isLazy)
                    this.removeAttribute("src")

                break
            }

            case 'lazy':{
                if(!ImgLazy.ATTR_LAZY.has(newValue)) return console.error('Can be setted only value: ', ImgLazy.ATTR_LAZY)

                if(newValue == "true" || newValue == ""){
                    this._isLazy = true
                }
                else if(newValue == "false"){
                    this._isLazy = false
                }


                break
            }
            
            case 'placeholder':{
                if(!ImgLazy.ATTR_PLACEHOLDER.has(newValue)) return console.error('Can be setted only value: ', ImgLazy.ATTR_PLACEHOLDER)

                if(newValue == "true" || newValue == ""){
                    this._isPlaceholderShowable = this.root.placeholder.loading = true
                }
                else if(newValue == "false"){
                    this._isPlaceholderShowable = this.root.placeholder.loading = false
                }


                break
            }
            case 'width':{
                if(newValue){
                    this.style.setProperty('--img-width', newValue+'px');
                    this.root.image.width = newValue
                }
                else
                    this.style.removeProperty('--img-width')
                    
                
                break
            }
            
            case 'height':{
                if(newValue){
                    this.style.setProperty('--img-height', newValue+'px');
                    this.root.image.height = newValue
                }
                else
                    this.style.removeProperty('--img-height')
                break
            }
           
        }
    }

    //#region Private
    

        load(){
            if(this._isLoaded)
                return 

            this.showPlaceholder()
            this.root.image.src = this._src
            this.root.image.decode()
                .then(this.loaded.bind(this))
                .catch(this.failed.bind(this));
            
            console.debug('Loading image...',this.root)
        }

        loaded(){
            if(!this.root.image.complete)
                return

            console.debug('Image loaded',this.root)
            this._isLoaded = true
            
            this.style.removeProperty('--img-width')
            this.style.removeProperty('--img-height')
            this.root.image.classList.remove('hidden')

            this.hidePlaceholder()
        }


        showPlaceholder(){
            if(!this._isPlaceholderShowable)
                return

            console.debug('Show placeholder',this.root)
            this.root.placeholder.loading = true
        }

        hidePlaceholder(){
            if(!this._isPlaceholderShowable)
                return

            console.debug('Hide placeholder',this.root)
            this.root.placeholder.loading = false
        }

    //#endregion

    //#region Methods
    //#endregion
}

    
customElements.define('img-lazy', ImgLazy)
