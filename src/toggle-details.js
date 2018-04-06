/*!
 * toggle-details.js v0.1.3 (https://github.com/ssagga/toggle-details)
 * @copyright 2018 Samer Al-Saqqa
 * @license MIT (https://github.com/ssagga/toggle-details/blob/master/LICENSE)
 */

class toggleDetails{
    constructor(){
        //console.log("Object created")   //DEBUG
        this._contentClassName
        this._detailsClassName
        this._parentNodes
        this._toggleClass = 'toggle-details-hidden'
        this._toggleButtonClass = 'toggle-details-button'
        this._responsiveBreakpoint = 768
    }

    initialize(contentClass , detailsClass , breakpoint){
        //Check that class names are supplimented
        if(!contentClass || !detailsClass ||!breakpoint){
            throw new Error("Required missing parameters: Content class names");
        }
        this._contentClassName = contentClass;
        this._detailsClassName = detailsClass;
        this._responsiveBreakpoint = breakpoint;
        //console.log(this._contentClassName, this._detailsClassName)    //DEBUG

        //Find DOM nodes with supplied class names
        this._parentNodes = document.querySelectorAll('.'+this._contentClassName)
        this._parentNodes.forEach((node)=>{
            const _details = node.querySelector('.'+this._detailsClassName)
            const _toggleButton = document.createElement('a')
            _toggleButton.href = ''
            _toggleButton.innerHTML = 'Toggle'
            _toggleButton.classList.add(this._toggleButtonClass)
            _details.parentNode.insertBefore(_toggleButton,_details.nextSibling)
            
            _toggleButton.addEventListener('click',(e)=>{
                e.preventDefault()
                const _details = e.target.parentNode.querySelector('.'+this._detailsClassName)
                if (_details.classList.contains(this._toggleClass)){
                    _details.classList.remove(this._toggleClass)
                }else{
                    _details.classList.add(this._toggleClass)
                }
                //console.log(_details)   //DEBUG
            })
        })

        //Add media query listeners to detect screen size
        let _media = window.matchMedia(`(max-width: ${this._responsiveBreakpoint}px)`)
        _media.addListener(()=>{this.responsiveCheck(_media)})
        this.responsiveCheck(_media)
        

        //Add toggle style rules to the DOM
        let css = `.${this._toggleClass} {display: none;}`,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }

    responsiveCheck(media){
        if (media.matches){
            this.toggleMobileMode()
        } else {
            this.toggleDesktopMode()
        }
    }

    toggleMobileMode(){
        this._parentNodes.forEach((node)=>{
            const _details = node.querySelector('.'+this._detailsClassName)
            const _button = node.querySelector('.'+this._toggleButtonClass)
            _details.classList.add(this._toggleClass)
            _button.style.display = 'block'
        })
    }

    toggleDesktopMode(){
        this._parentNodes.forEach((node)=>{
            const _details = node.querySelector('.'+this._detailsClassName)
            const _button = node.querySelector('.'+this._toggleButtonClass)
            _details.classList.remove(this._toggleClass)
            _button.style.display = 'none'
        })
    }
}


