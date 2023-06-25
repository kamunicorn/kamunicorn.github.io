Vue.component('ui-slider', {
	props: {
		accuracy: Number,
		min: Number,
		max: Number,
		value: Number,
		labelby: String
	},
	template: '#ui-slider-template',
  data: function() {
		return {
			dragging: false,
			x: 0,
			width: 0,
			span: 0,
			val: 0
		}
  },
	created: function() {
		this.val = this.value;
	},
	beforeDestroy: function () {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted: function() {		
		this.width = this.$refs.body.getBoundingClientRect().width;
		this.span = this.$refs.btn.getBoundingClientRect().width;
		window.addEventListener('resize', this.handleResize)
	},
	methods: {
		handleResize: function() {
			this.width = this.$refs.body.getBoundingClientRect().width;
		},
		ceil: function(value, digits)
		{
			let scale = Math.pow(10, digits);
			return Math.round( value * scale ) / scale;
		},
		setPos(event) {
			let x = event.offsetX;
			let b = event.target.getBoundingClientRect();
			this.width = b.width;
			let v = (x / b.width) * (this.max - this.min) + this.min;
			this.renderPos(v);
		},
		getPos() {
			return (this.val - this.min) / (this.max - this.min) * (this.width - this.span);
		},
    startDrag() {
      this.dragging = true;
      this.x = event.pageX;
    },
    stopDrag() {
      this.dragging = false;
    },
    doDrag(event) {
      if (this.dragging) {
				let dx = event.pageX - this.x;
				this.x = event.pageX;
				let v = this.val;
				v += (dx / (this.width - this.span)) * (this.max - this.min) //dx / this.width;
				this.renderPos(v);
      }
    },
		doLeft() {
			this.doShift(-1/10);
		},
		doRight() {
			this.doShift(+1/10);
		},
		doShift(scale) {
			let len = Math.abs(this.max - this.min);
			let dx = len * scale;
			let v = this.val;
			v += dx;
			this.renderPos(v);
		},
		renderPos(v) {
			this.val = Math.max( Math.min(this.max, v), this.min);
			this.$emit('change', this.ceil(this.val, this.accuracy));			
		},
	}
})