js编程思路
一：编写配置信息
Config: {
            serverUrl: 
            sessionTimeout: 360, 
            maxWaitTime: 3600, 
            ver: "1"
        },
二：编写变量信息
// 发送到服务器的列名称
            eventName: "en",
            version: "ver",
            platform: "pl",
            sdk: "sdk",
            uuid: "u_ud",
            memberId: "u_mid",
            sessionId: "u_sd",
            clientTime: "c_time",
            language: "l",
            userAgent: "b_iev",
            resolution: "b_rst",
            currentUrl: "p_url",
            referrerUrl: "p_ref",
            title: "tt",
            orderId: "oid",
            orderName: "on",
            currencyAmount: "cua",
            currencyType: "cut",
            paymentType: "pt",
            category: "ca",
            action: "ac",
            kv: "kv_",
            duration: "du"
			
			pageView: "e_pv",
            chargeRequestEvent: "e_crt",
            launch: "e_l",
            eventDurationEvent: "e_e",
            sid: "bftrack_sid",
            uuid: "bftrack_uuid",
            mid: "bftrack_mid",
            preVisitTime: "bftrack_previsit",

三：编写共用的方法

         获取会话id
		 保存会话id到cookie
		 获取uuid，从cookie中
		 保存uuid到cookie
		 获取memberID
		 设置mid
		 onLaunch: function() {
				// 触发launch事件
				// 设置事件名称
				// 最终发送编码后的数据
			}
		 onPageView: function() {
                 // 触发page view事件
                 // 设置当前url
                 // 设置前一个页面的url
                 // 设置title
                 // 设置公用columns
                 // 最终发送编码后的数据
         }
        onChargeRequest
        onEventDuration
		
        sendDataToServer: function(data) {
          
        },

        往data中添加发送到日志收集服务器的公用部分
	    创建新的会员，并判断是否是第一次访问页面，如果是，进行launch事件的发送
        createNewSession
		参数编码返回字符串
		parseParam
        产生uuid
      
        isSessionTimeout
        更新最近访问时间
        updatePreVisitTime
        打印日志
		
四：编写对外暴露的方法名称
	// 对外暴露的方法名称
	window.__AE__ = {
		startSession: function() {
		},
		onPageView: function() {
		},
		onChargeRequest: function() {
			
		},
		onEventDuration: function() {
			
		},
		setMemberId: function() {
		}
		
五：
	// 自动加载方法
	var autoLoad = function() {
		// 进行参数设置
		var _aelog_ = _aelog_ || window._aelog_ || [];
		var memberId = null;
		for (i=0;i<_aelog_.length;i++) {
			_aelog_[i][0] === "memberId" && (memberId = _aelog_[i][1]);
		}
		// 根据是给定memberid，设置memberid的值
		memberId && __AE__.setMemberId(memberId);
		// 启动session
		__AE__.startSession();
	};

	autoLoad();
		

		
		
		
		
		
        preCallApi: function() {
            if (this.isSessionTimeout()) {
                // 如果为true，表示需要新建
                this.startSession();
            } else {
                this.updatePreVisitTime(new Date().getTime());
            }
            return true;
        },

		sendDataToServer: function(data) {
				// 发送数据data到服务器，其中data是一个字符串
				var that = this;
				var i2 = new Image(1,1);
				i2.onerror = function(){
					// 这里可以进行重试操作
				};
				i2.src = this.clientConfig.serverUrl + "?" + data;
			}