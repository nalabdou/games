import { Controller } from "stimulus"
import Notify from 'simple-notify'

export default class extends Controller {
    static targets = ['color', 'hex']
    connect() {
        this.genareateColor()
    }
    genareateColor() {
        this.colorTargets.forEach(target => {
            let colorHex = "#" + ((1 << 24) * Math.random() | 0).toString(16)
            target.style.background = colorHex
            target.innerHTML = `<h3 data-colors-target="hex" data-action='click->colors#copy'>${colorHex}</h3>`
        })
    }
    copy(event) {
        navigator.clipboard.writeText(event.currentTarget.textContent)
            .then(
                this.push('success', `${event.currentTarget.textContent} copied !!`)
            )
    }

    push(type, title, text) {
        new Notify({
            status: type || 'success',
            title: title,
            text: text || '🙌🏼 🙌🏼 🙌🏼 🙌🏼',
            effect: 'fade',
            speed: 300,
            customClass: null,
            customIcon: null,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'bottom left'
        })
    }
}
