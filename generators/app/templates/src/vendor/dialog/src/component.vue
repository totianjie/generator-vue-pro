<template>
  <transition name="dialog-fade">
    <div class="v-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div
        class="v-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'v-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="v-dialog__header">
          <slot name="title">
            <span class="v-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="v-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="v-dialog__close v-icon v-icon-close"></i>
          </button>
        </div>
        <div class="v-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="v-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from './popup';
  import Migrating from './migrating';
  import emitter from './emitter';

  export default {
      name: 'VDialog',

      mixins: [Popup, emitter, Migrating],

      props: {
          title: {
              type: String,
              default: ''
          },

          modal: {
              type: Boolean,
              default: true
          },

          modalAppendToBody: {
              type: Boolean,
              default: true
          },

          appendToBody: {
              type: Boolean,
              default: false
          },

          lockScroll: {
              type: Boolean,
              default: true
          },

          closeOnClickModal: {
              type: Boolean,
              default: true
          },

          closeOnPressEscape: {
              type: Boolean,
              default: true
          },

          showClose: {
              type: Boolean,
              default: true
          },

          width: String,

          fullscreen: Boolean,

          customClass: {
              type: String,
              default: ''
          },

          top: {
              type: String,
              default: '15vh'
          },
          beforeClose: Function,
          center: {
              type: Boolean,
              default: false
          }
      },

      data () {
          return {
              closed: false
          };
      },

      watch: {
          visible (val) {
              if (val) {
                  this.closed = false;
                  this.$emit('open');
                  this.$el.addEventListener('scroll', this.updatePopper);
                  this.$nextTick(() => {
                      this.$refs.dialog.scrollTop = 0;
                  });
                  if (this.appendToBody) {
                      document.body.appendChild(this.$el);
                  }
              } else {
                  this.$el.removeEventListener('scroll', this.updatePopper);
                  if (!this.closed) this.$emit('close');
              }
          }
      },

      computed: {
          style () {
              let style = {};
              if (this.width) {
                  style.width = this.width;
              }
              if (!this.fullscreen) {
                  style.marginTop = this.top;
              }
              return style;
          }
      },

      methods: {
          getMigratingConfig () {
              return {
                  props: {
                      'size': 'size is removed.'
                  }
              };
          },
          handleWrapperClick () {
              if (!this.closeOnClickModal) return;
              this.handleClose();
          },
          handleClose () {
              if (typeof this.beforeClose === 'function') {
                  this.beforeClose(this.hide);
              } else {
                  this.hide();
              }
          },
          hide (cancel) {
              if (cancel !== false) {
                  this.$emit('update:visible', false);
                  this.$emit('close');
                  this.closed = true;
              }
          },
          updatePopper () {
              this.broadcast('ElSelectDropdown', 'updatePopper');
              this.broadcast('ElDropdownMenu', 'updatePopper');
          }
      },

      mounted () {
          if (this.visible) {
              this.rendered = true;
              this.open();
              if (this.appendToBody) {
                  document.body.appendChild(this.$el);
              }
          }
      },

      destroyed () {
      // if appendToBody is true, remove DOM node after destroy
          if (this.appendToBody && this.$el && this.$el.parentNode) {
              this.$el.parentNode.removeChild(this.$el);
          }
      }
  };
</script>
<style>
.v-modal-enter {
	-webkit-animation:v-modal-in .2s ease;
	animation:v-modal-in .2s ease
}
.v-modal-leave {
	-webkit-animation:v-modal-out .2s ease forwards;
	animation:v-modal-out .2s ease forwards
}
@-webkit-keyframes v-modal-in {
    0% {
        opacity:0
    }
}
@keyframes v-modal-in {
	  0% {
	      opacity:0
    }
}
@-webkit-keyframes v-modal-out {
	  100% {
	      opacity:0
    }
}
@keyframes v-modal-out {
    100% {
        opacity:0
    }
}
.v-modal_reset {
	/* position: absolute;
	left:0;
	top:0;
	width:100%;
	height:100%;
	opacity:.5;
	background:#000 */
}
.v-dialog {
	position:relative;
	margin:0 auto 50px;
	background:#fff;
	border-radius:2px;
	-webkit-box-shadow:0 1px 3px rgba(0,0,0,.3);
	box-shadow:0 1px 3px rgba(0,0,0,.3);
	-webkit-box-sizing:border-box;
	box-sizing:border-box;
	width:50%
}
.v-dialog.is-fullscreen {
	width:100%;
	margin-top:0;
	margin-bottom:0;
	height:100%;
	overflow:auto
}
.v-dialog__wrapper {
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	overflow:auto;
    margin:0;
    background: rgba(0,0,0,0.5);
}
.v-dialog__header {
	padding:20px 20px 10px
}
.v-dialog__headerbtn {
	position:absolute;
	top:20px;
	right:20px;
	padding:0;
	background:0 0;
	border:none;
	outline:0;
	cursor:pointer;
	font-size:16px
}
.v-dialog__headerbtn .v-dialog__close {
	color:#909399
}
.v-dialog__headerbtn:focus .v-dialog__close,.v-dialog__headerbtn:hover .v-dialog__close {
	color:#409EFF
}
.v-dialog__title {
	line-height:24px;
	font-size:18px;
	color:#303133
}
.v-dialog__body {
	padding:30px 20px;
	color:#606266;
	line-height:24px;
	font-size:14px
}
.v-dialog__footer {
	padding:10px 20px 20px;
	text-align:right;
	-webkit-box-sizing:border-box;
	box-sizing:border-box
}
.v-dialog--center {
	text-align:center
}
.v-dialog--center .v-dialog__body {
	text-align:initial;
	padding:25px 25px 30px
}
.v-dialog--center .v-dialog__footer {
	text-align:inherit
}
.dialog-fade-enter-active {
	-webkit-animation:dialog-fade-in .3s;
	animation:dialog-fade-in .3s
}
.dialog-fade-leave-active {
	-webkit-animation:dialog-fade-out .3s;
	animation:dialog-fade-out .3s
}
@-webkit-keyframes dialog-fade-in {
    0% {
        -webkit-transform:translate3d(0,-20px,0);
        transform:translate3d(0,-20px,0);
        opacity:0
    }
    100% {
        -webkit-transform:translate3d(0,0,0);
        transform:translate3d(0,0,0);
        opacity:1
    }
}
@-webkit-keyframes dialog-fade-out {
    0% {
        -webkit-transform:translate3d(0,0,0);
        transform:translate3d(0,0,0);
        opacity:1
    }
    100% {
        -webkit-transform:translate3d(0,-20px,0);
        transform:translate3d(0,-20px,0);
        opacity:0
    }
}
</style>

