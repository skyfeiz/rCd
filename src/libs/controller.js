this.WBST = this.WBST || {};
(function(win,doc){
	function Controller (){
		var baseUrl = '';
		var hostUrl = './debug/';
		var api = {

			/*  ----------------------------- 智能服务 ------------------------------------  */
			znfw_6box: hostUrl+'znfw_6box.json',			// 	6边形
			znfw_gzl: hostUrl+'znfw_gzl.json', 				//	故障率
			znfw_gzl_act: hostUrl+'znfw_gzl_act.json', 		//	故障率降低举措

			znfw_hsbl: hostUrl+'znfw_hsbl.json', 			//	回收比例
			znfw_hsbl_act: hostUrl+'znfw_hsbl_act.json', 	//	旧件回收比例提高举措

			znfw_kyl: hostUrl+'znfw_kyl.json', 				//	常用备件可用率
			znfw_kyl_act: hostUrl+'znfw_kyl_act.json', 		//	提高备件可用率举措

			znfw_xfl: hostUrl+'znfw_xfl.json', 				//	一次性修复率
			znfw_xfl_act: hostUrl+'znfw_xfl_act.json', 		//	一次性修复率提高举措

			znfw_xysj: hostUrl+'znfw_xysj.json', 			//	工程师响应时间
			znfw_xysj_act: hostUrl+'znfw_xysj_act.json', 	//	高效响应举措

			/*  ----------------------------- 延长保修 ------------------------------------  */

			ycbx_xzsb: hostUrl+'ycbx_xzsb.json', 			//	选择设备
			ycbx_sbdcgs: hostUrl+'ycbx_sbdcgs.json', 		//	设备档次归属
			ycbx_xzbxcp: hostUrl+'ycbx_xzbxcp.json', 		//	选择保修产品
			ycbx_bjjs: hostUrl+'ycbx_bjjs.json', 			//	报价计算

			/*  ----------------------------- 绣花机工况 ------------------------------------  */

			xhj_jjzs: hostUrl+'xhj_jjzs.json', 				//	经济行业指数
			xhj_lxqs: hostUrl+'xhj_lxqs.json', 				//	流行趋势
			xhj_xlts: hostUrl+'xhj_xlts.json', 				//	生产效率提升
			xhj_yycb: hostUrl+'xhj_yycb.json', 				//	运营成本
			xhj_bll: hostUrl+'xhj_bll.json', 				//	不良率

			/*  ----------------------------- 研发辅助 ------------------------------------  */

			yffz_gzpc: hostUrl+'yffz_gzpc.json', 			//	模块故障频次
			yffz_jscl: hostUrl+'yffz_jscl.json', 			//	节省策略
			yffz_zqcl: hostUrl+'yffz_zqcl.json', 			//	增强策略
			yffz_bccl: hostUrl+'yffz_bccl.json',	 		//	保持策略

			/*  ----------------------------- 创新模式 ------------------------------------  */

			cxms_kgl: hostUrl+'cxms_kgl.json', 				//	刺绣机开工率
			cxms_jgph: hostUrl+'cxms_jgph.json', 			//	热销花样价格排行
			cxms_lxqs: hostUrl+'cxms_lxqs.json', 			//	花样流行趋势
			//back
			cxms_back_yfzq: hostUrl+'cxms_back_yfzq.json', 	//	产品研发周期
			cxms_back_lyl: hostUrl+'cxms_back_lyl.json', 	//	能源利用率
			cxms_back_xlts: hostUrl+'cxms_back_xlts.json', 	//	生产效率提升
			cxms_back_yycb: hostUrl+'cxms_back_yycb.json', 	//	设备运营成本
			cxms_back_bll: hostUrl+'cxms_back_bll.json',	// 	产品不良率
		}

		// 异步请求方法
		var requestAsk = function(opt){
			$.ajax({
				type: opt.type || "GET",
				data: opt.data || {},
				url: baseUrl + opt.url,
				success: function(json) {
					if (opt.callback instanceof Function)
						opt.callback(json);
				},
				error: function() {
					console.log(opt.url);
					throw new Error(baseUrl + opt.url + " 接口");
				}
			})
		}

		//	============================== 接口请求函数 ====================================

		/*  ----------------------------- 智能服务 ------------------------------------  */
		this.getZnfw_6box = function(data, callback) {
			requestAsk({
				url: api.znfw_6box,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_gzl = function(data, callback) {
			requestAsk({
				url: api.znfw_gzl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_gzl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_gzl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_hsbl = function(data, callback) {
			requestAsk({
				url: api.znfw_hsbl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_hsbl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_hsbl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_kyl = function(data, callback) {
			requestAsk({
				url: api.znfw_kyl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_kyl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_kyl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xfl = function(data, callback) {
			requestAsk({
				url: api.znfw_xfl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xfl_act = function(data, callback) {
			requestAsk({
				url: api.znfw_xfl_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xysj = function(data, callback) {
			requestAsk({
				url: api.znfw_xysj,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getZnfw_xysj_act = function(data, callback) {
			requestAsk({
				url: api.znfw_xysj_act,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 延长保修 ------------------------------------  */

		this.getYcbx_xzsb = function(data, callback) {
			requestAsk({
				url: api.ycbx_xzsb,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_sbdcgs = function(data, callback) {
			requestAsk({
				url: api.ycbx_sbdcgs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_xzbxcp = function(data, callback) {
			requestAsk({
				url: api.ycbx_xzbxcp,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYcbx_bjjs = function(data, callback) {
			requestAsk({
				url: api.ycbx_bjjs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 绣花机工况 ------------------------------------  */

		this.getXhj_xlts = function(data, callback) {
			requestAsk({
				url: api.xhj_xlts,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_yycb = function(data, callback) {
			requestAsk({
				url: api.xhj_yycb,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_bll = function(data, callback) {
			requestAsk({
				url: api.xhj_bll,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_jjzs = function(data, callback) {
			requestAsk({
				url: api.xhj_jjzs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_lxqs = function(data, callback) {
			requestAsk({
				url: api.xhj_lxqs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getXhj_sjbd = function(data, callback) {
			requestAsk({
				url: api.xhj_sjbd,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 研发辅助 ------------------------------------  */

		this.getYffz_gzpc = function(data, callback) {
			requestAsk({
				url: api.yffz_gzpc,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_jscl = function(data, callback) {
			requestAsk({
				url: api.yffz_jscl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_zqcl = function(data, callback) {
			requestAsk({
				url: api.yffz_zqcl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getYffz_bccl = function(data, callback) {
			requestAsk({
				url: api.yffz_bccl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		/*  ----------------------------- 创新模式 ------------------------------------  */

		this.getCxms_kgl = function(data, callback) {
			requestAsk({
				url: api.cxms_kgl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_jgph = function(data, callback) {
			requestAsk({
				url: api.cxms_jgph,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_lxqs = function(data, callback) {
			requestAsk({
				url: api.cxms_lxqs,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		// back
		this.getCxms_back_yfzq = function(data, callback) {
			requestAsk({
				url: api.cxms_back_yfzq,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_back_lyl = function(data, callback) {
			requestAsk({
				url: api.cxms_back_lyl,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_back_xlts = function(data, callback) {
			requestAsk({
				url: api.cxms_back_xlts,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_back_yycb = function(data, callback) {
			requestAsk({
				url: api.cxms_back_yycb,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};

		this.getCxms_back_bll = function(data, callback) {
			requestAsk({
				url: api.cxms_back_bll,
				data: data,
				callback: function(json) {
					if (callback instanceof Function) {
						callback(json);
					}
				}
			});
		};
	}

	WBST.Controller = Controller;
})(window,document)