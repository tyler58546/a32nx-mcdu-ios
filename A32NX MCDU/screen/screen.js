class MCDU {

    constructor() {
        this._title = undefined;
        this._pageCurrent = undefined;
        this._pageCount = undefined;
        this._labels = [];
        this._lines = [];
        this._inOut = undefined;
    }

    formatCell(str) {
        return str
            .replace(/{big}/g, "<span class='b-text'>")
            .replace(/{small}/g, "<span class='s-text'>")
            .replace(/{big}/g, "<span class='b-text'>")
            .replace(/{amber}/g, "<span class='amber'>")
            .replace(/{red}/g, "<span class='red'>")
            .replace(/{green}/g, "<span class='green'>")
            .replace(/{cyan}/g, "<span class='cyan'>")
            .replace(/{white}/g, "<span class='white'>")
            .replace(/{magenta}/g, "<span class='magenta'>")
            .replace(/{yellow}/g, "<span class='yellow'>")
            .replace(/{inop}/g, "<span class='inop'>")
            .replace(/{sp}/g, "&nbsp;")
            .replace(/{left}/g, "<span class='left'>")
            .replace(/{right}/g, "<span class='right'>")
            .replace(/{end}/g, "</span>");
    }

    generateHTMLLayout(parent) {
        while (parent.children.length > 0) {
            parent.removeChild(parent.children[0]);
        }
        const header = document.createElement("div");
        header.id = "header";

        const titleLeft = document.createElement("div");
        titleLeft.classList.add("s-text");
        titleLeft.id = "title-left";
        parent.appendChild(titleLeft);

        const title = document.createElement("span");
        title.id = "title";
        header.appendChild(title);

        /*this.arrowHorizontal = document.createElement("span");
        this.arrowHorizontal.id = "arrow-horizontal";
        this.arrowHorizontal.innerHTML = "←→\xa0";
        header.appendChild(this.arrowHorizontal);*/

        parent.appendChild(header);

        for (let i = 0; i < 6; i++) {
            const label = document.createElement("div");
            label.classList.add("label", "s-text");
            const labelLeft = document.createElement("span");
            labelLeft.id = "label-" + i + "-left";
            labelLeft.classList.add("fmc-block", "label", "label-left");
            const labelRight = document.createElement("span");
            labelRight.id = "label-" + i + "-right";
            labelRight.classList.add("fmc-block", "label", "label-right");
            const labelCenter = document.createElement("span");
            labelCenter.id = "label-" + i + "-center";
            labelCenter.classList.add("fmc-block", "label", "label-center");
            label.appendChild(labelLeft);
            label.appendChild(labelRight);
            label.appendChild(labelCenter);
            parent.appendChild(label);
            const line = document.createElement("div");
            line.classList.add("line");
            const lineLeft = document.createElement("span");
            lineLeft.id = "line-" + i + "-left";
            lineLeft.classList.add("fmc-block", "line", "line-left");
            const lineRight = document.createElement("span");
            lineRight.id = "line-" + i + "-right";
            lineRight.classList.add("fmc-block", "line", "line-right");
            const lineCenter = document.createElement("span");
            lineCenter.id = "line-" + i + "-center";
            lineCenter.classList.add("fmc-block", "line", "line-center");
            line.appendChild(lineLeft);
            line.appendChild(lineRight);
            line.appendChild(lineCenter);
            parent.appendChild(line);
        }
        const footer = document.createElement("div");
        footer.classList.add("line");
        const inout = document.createElement("span");
        inout.id = "in-out";

        /*this.arrowVertical = document.createElement("span");
        this.arrowVertical.id = "arrow-vertical";
        this.arrowVertical.innerHTML = "↓↑\xa0";*/

        footer.appendChild(inout);
        //footer.appendChild(this.arrowVertical);
        parent.appendChild(footer);
        console.error(footer.innerHTML);

        this._titleLeftElement = document.getElementById("title-left");
        this._titleElement = document.getElementById("title");
        this._pageCurrentElement = document.getElementById("page-current");
        this._pageCountElement = document.getElementById("page-count");
        this._labelElements = [];
        this._lineElements = [];
        for (let i = 0; i < 6; i++) {
            this._labelElements[i] = [
                document.getElementById("label-" + i + "-left"),
                document.getElementById("label-" + i + "-right"),
                document.getElementById("label-" + i + "-center")
            ];
            this._lineElements[i] = [
                document.getElementById("line-" + i + "-left"),
                document.getElementById("line-" + i + "-right"),
                document.getElementById("line-" + i + "-center")
            ];
        }
        this._inOutElement = document.getElementById("in-out");
        this._inOutElement.style.removeProperty("color");
        this._inOutElement.className = "white";
    }

    setTitle(content) {
        let color = content.split("[color]")[1];
        if (!color) {
            color = "white";
        }
        this._title = content.split("[color]")[0];
        this._titleElement.classList.remove("white", "cyan", "yellow", "green", "amber", "red", "magenta", "inop");
        this._titleElement.classList.add(color);
        this._titleElement.textContent = this._title;
        this._titleElement.innerHTML = this.formatCell(this._titleElement.innerHTML);
    }

    setLabel(label, row, col = -1) {
        if (col >= this._labelElements[row].length) {
            return;
        }
        if (!this._labels[row]) {
            this._labels[row] = [];
        }
        if (!label) {
            label = "";
        }
        if (col === -1) {
            for (let i = 0; i < this._labelElements[row].length; i++) {
                this._labels[row][i] = "";
                this._labelElements[row][i].textContent = "";
            }
            col = 0;
        }
        if (label === "__FMCSEPARATOR") {
            label = "------------------------";
        }
        if (label !== "") {
            if (label.indexOf("[b-text]") !== -1) {
                label = label.replace("[b-text]", "");
                this._lineElements[row][col].classList.remove("s-text");
                this._lineElements[row][col].classList.add("msg-text");
            } else {
                this._lineElements[row][col].classList.remove("msg-text");
            }

            let color = label.split("[color]")[1];
            if (!color) {
                color = "white";
            }
            const e = this._labelElements[row][col];
            e.classList.remove("white", "cyan", "yellow", "green", "amber", "red", "magenta", "inop");
            e.classList.add(color);
            label = label.split("[color]")[0];
        }
        this._labels[row][col] = label;
        this._labelElements[row][col].textContent = label;
        this._labelElements[row][col].innerHTML = this.formatCell(this._labelElements[row][col].innerHTML);
    }

    setLine(content, row, col = -1) {
        if (col >= this._lineElements[row].length) {
            return;
        }
        if (!content) {
            content = "";
        }
        if (!this._lines[row]) {
            this._lines[row] = [];
        }
        if (col === -1) {
            for (let i = 0; i < this._lineElements[row].length; i++) {
                this._lines[row][i] = "";
                this._lineElements[row][i].textContent = "";
            }
            col = 0;
        }
        if (content === "__FMCSEPARATOR") {
            content = "------------------------";
        }
        if (content !== "") {
            if (content.indexOf("[s-text]") !== -1) {
                content = content.replace("[s-text]", "");
                this._lineElements[row][col].classList.add("s-text");
            } else {
                this._lineElements[row][col].classList.remove("s-text");
            }
            let color = content.split("[color]")[1];
            if (!color) {
                color = "white";
            }
            const e = this._lineElements[row][col];
            e.classList.remove("white", "cyan", "yellow", "green", "amber", "red", "magenta", "inop");
            e.classList.add(color);
            content = content.split("[color]")[0];
        }
        this._lines[row][col] = content;
        this._lineElements[row][col].textContent = this._lines[row][col];
        this._lineElements[row][col].innerHTML = this.formatCell(this._lineElements[row][col].innerHTML);
    }

    setInOut(content) {
        this._inOut = content;
        this._inOutElement.textContent = this._inOut;
    }
}

document.mcdu = new MCDU();

document.addEventListener('DOMContentLoaded', () => {
    const mcdu = document.mcdu;
    mcdu.generateHTMLLayout(document.getElementById("screen"));
    
    document.socket = new WebSocket('ws://192.168.7.228:8080');
    const socket = document.socket;
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        const message = event.data;
        if (message.startsWith("setLabel:")) {
            const args = JSON.parse(message.substring(9));
            mcdu.setLabel(args[0], args[1], args[2]);
        }
        if (message.startsWith("setLine:")) {
            const args = JSON.parse(message.substring(8));
            mcdu.setLine(args[0], args[1], args[2]);
        }

        if (message.startsWith("setTitle:")) {
            const args = JSON.parse(message.substring(9));
            mcdu.setTitle(args[0], args[1], args[2]);
        }

        if (message.startsWith("setInOut:")) {
            const args = JSON.parse(message.substring(9));
            mcdu.setInOut(args[0]);
        }
    });
    
    mcdu.setTitle("Test");
}, false);
