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
		执行对外方法前必须执行的方法
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
        },

       往data中添加发送到日志收集服务器的公用部分
	   创建新的会员，并判断是否是第一次访问页面，如果是，进行launch事件的发送。
        createNewSession
		参数编码返回字符串
		parseParam
        parseParam: function(data) {
           
        }
        /**
         * 产生uuid
         */
        generateId: function() {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var tmpid = [];
            var r;
            tmpid[8] = tmpid[13] = tmpid[18] = tmpid[23] = '-';
            tmpid[14] = '4';

            for (i=0; i<36; i++) {
                if (!tmpid[i]) {
                    r = 0| Math.random()*16;
                    tmpid[i] = chars[(i==19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return tmpid.join('');
        },

        /**
         * 判断这个会话是否过期，查看当前时间和最近访问时间间隔时间是否小于this.clientConfig.sessionTimeout<br/>
         * 如果是小于，返回false;否则返回true。
         */
        isSessionTimeout: function() {
            var time = new Date().getTime();
            var preTime = CookieUtil.get(this.keys.preVisitTime);
            if (preTime) {
                // 最近访问时间存在,那么进行区间判断
                return time - preTime > this.clientConfig.sessionTimeout * 1000;
            }
            return true;
        },

        /**
         * 更新最近访问时间
         */
        updatePreVisitTime: function(time) {
            CookieUtil.setExt(this.keys.preVisitTime, time);
        },

        /**
         * 打印日志
         */
    };