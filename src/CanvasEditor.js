// CanvasEditor.js
class CanvasEditor {
    constructor(canvas, template) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.template = JSON.parse(template);
      this.loadImages();
      this.userImage = null;
    }
  
    async loadImages() {
      const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src + "?random=" + Math.random();
      });
  
      const urls = this.template.urls;
      this.maskImage = await loadImage(urls.mask);
      this.strokeImage = await loadImage(urls.stroke);
      this.designPatternImage = await loadImage(urls.design_pattern);
      this.draw();
    }
  
    setBackgroundImage(color) {
      this.template.background_color = color;
      this.draw();
    }
  
    setCaption(text) {
      this.template.caption.text = text;
      this.draw();
    }
  
    setCtaText(text) {
      this.template.cta.text = text;
      this.draw();
    }
  
    async setImage(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.userImage = img;
          this.draw();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  
    drawText(text, x, y, fontSize, color, maxCharsPerLine) {
      // Implement text wrapping and drawing based on maxCharsPerLine
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.ctx.fillStyle = this.template.background_color || "#0369A1";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.ctx.drawImage(this.designPatternImage, 0, 0, this.canvas.width, this.canvas.height);
  
      if (this.userImage) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(this.template.image_mask.x, this.template.image_mask.y, this.template.image_mask.width, this.template.image_mask.height);
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(this.userImage, this.template.image_mask.x, this.template.image_mask.y, this.template.image_mask.width, this.template.image_mask.height);
        this.ctx.restore();
      }
  
      this.ctx.drawImage(this.strokeImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  export default CanvasEditor;
  