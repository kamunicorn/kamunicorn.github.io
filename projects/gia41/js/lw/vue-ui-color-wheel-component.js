Vue.component('ui-color-wheel', {
	props: { hue1: Number, hue2: Number },
	template: '#ui-color_wheel-template',
	data: function() {
		return {
			dragging: false,
			angle1: 210,
			angle2: 350,
			last: 0,
			center: {},
			marker: '',
			interval: null,
		}
	},
	vars: {
		test: 1
	},
	created: function() {
		this.angle1 = this.hue1;
		this.angle2 = this.hue2;
	},
	mounted: function() {
	},
	watch: {
		'hue1': function(h){
			this.angle1 = h;
		},
		'hue2': function(h) {
			this.angle2 = h;
		}
	},
	methods: {
		getTransform: function(a) {
			let x = Math.round(110 * Math.sin((180-a)/180*Math.PI) - 20/2);
			let y = Math.round(110 * Math.cos((180-a)/180*Math.PI) - 20/2);
			return {transform: `translate(${x}px, ${y}px)`}
		},
		getAngle: function(event) {
				let x = event.pageX - this.center.x;
				let y = event.pageY - this.center.y;
				
				let k = Math.sqrt(x*x + y*y); if ( k < 50 ) return;
				
				let a = Math.round( Math.acos(x / k)/Math.PI*180 );
				return y < 0 ? 180 - a : 180 + a;		
		},
		getShift: function(a) {
			return a < this.angle1 ? 360 + a - this.angle1 : a - this.angle1;
		},
		setShift: function(s) {
			s = Math.max(30, Math.min(330, s));	
			this.angle2 = (this.angle1 + s)%360;
		},
		startDrag: function(target) {
      this.dragging = true;
			
			let b = this.$refs.wheel.getBoundingClientRect();
			this.center = {x: b.left + 161, y: b.top + 161}

			let that = this;
			let marker = target == 'hue1' ? 'angle1' : 'angle2';			
			that.marker = marker;
			that.last = that[marker];
			
			this.interval = setInterval(function(){
				if ( that.last == that[marker] ) return;
				that.last = that[marker];
				that.$emit('change', {hue1: that.angle1, hue2: that.angle2 });
			}, 100);
    },
    doDrag: function(event) {
      if (this.dragging) {
				let a = this.getAngle(event); if ( !a ) return;
				a = (a + 270)%360;
				
				if ( this.marker == 'angle1' ) 
				{
					let shift = this.getShift(this.angle2);				
					this.angle1 = a;
					this.setShift(shift);
				}
				else
				{
					let s = this.getShift(a);
					s = Math.max(90, Math.min(270, s));				
					this.setShift(s);
				}
      }
    },
    stopDrag: function() {
      this.dragging = false;
			clearInterval(this.interval);
    }
	}
})