riot.tag2('script', '', '', '', function(opts) {
	var gmodel = null;
	var gupdate = null;
});

riot.tag2('session-list', '<ul> <li each="{sess in gmodel.allSessions.array}"> <div onmousedown="{select}" class="{entry: true, card: true, card_selected: sess == gmodel.curSession}"> <div class="skin_cell" riot-style="background-image: url({sess.HeaderIcon})"></div> <div class="name_text">{sess.HeaderName}</div> <div class="msg_icon" show="{sess.hasNewMessage}"><img src="gr/msg_badge2.png" width="18px"></div> </div> </li> </ul>', 'session-list .entry,[data-is="session-list"] .entry{ position: relative; width: 200px; height: 47px; cursor: pointer; } session-list .skin_cell,[data-is="session-list"] .skin_cell{ position: absolute; left: 0; width: 40px; height: 40px; margin: 2px; } session-list .name_text,[data-is="session-list"] .name_text{ width: 195px; height: 44px; padding-left: 50px; line-height: 44px; overflow : hidden; } session-list .msg_icon,[data-is="session-list"] .msg_icon{ position: absolute; top: 4px; right: 4px; color: #0C0; }', '', function(opts) {
		this.select = function(e){
			gmodel.SelectSession(e.item.sess);
			gupdate();
		}.bind(this)
});



riot.tag2('user-list', '<ul> <li each="{user in gmodel.allUsers.array.filter(userFilter)}"> <div onmousedown="{onMouseDown}" class="{entry: true, card: true, card_selected: user == gmodel.curUser}" oncontextmenu="{onContextMenu}"> <div class="inner"> <div class="skin_cell" riot-style="background-image: url({user.skinUrlSmall})"></div> <span class="name_text">{user.GameFullName}</span> </div> <div class="cover"></div> <div class="preview" show="{user == gmodel.previewUser}"> </div> </div> </li> </ul>', 'user-list .entry,[data-is="user-list"] .entry{ position: relative; width: 200px; height:39px; cursor: pointer; } user-list .inner,[data-is="user-list"] .inner{ position: absolute; } user-list .cover,[data-is="user-list"] .cover{ position: absolute; width: 100%; height: 100%; } user-list .cover:hover,[data-is="user-list"] .cover:hover{ background-color: rgba(0, 128, 255, 0.1); } user-list .preview,[data-is="user-list"] .preview{ position: absolute; width: 100%; height: 100%; background-color: rgba(0, 128, 255, 0.2); } user-list .skin_cell,[data-is="user-list"] .skin_cell{ position: absolute; left: 0; width: 32px; height: 32px; margin: 2px; } user-list .name_text,[data-is="user-list"] .name_text{ width: 100px; padding-left: 44px; line-height: 36px; }', '', function(opts) {

		this.userFilter = function(user){
			if(user == gmodel.selfUser) return false;

			if(opts.range == 'team'){
				return user.teamRoomSig == gmodel.selfUser.teamRoomSig;
			}

			if(opts.range == 'server'){
				return user.serverRoomSig == gmodel.selfUser.serverRoomSig;
			}
			return true;
		}.bind(this)

		this.mouseX = 0;
		this.mouseY = 0;

		this.onMouseDown = function(e){
			var user = e.item.user;
			if(e.button == 0){
				gmodel.SelectUser(user);
				gupdate();
			}else if(e.button == 2){

				gmodel.previewUser = user;
				gupdate();
			}
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}.bind(this)

		this.onContextMenu = function(e){

			this.parent.showMenu1();
			gupdate();
			e.preventDefault();
			return false;
		}.bind(this)
});




riot.tag2('user-list-tiled', '<ul> <li each="{user in gmodel.allUsers.array.filter(userFilter)}"> <div onmousedown="{onMouseDown}" class="{card: true, entry: true, card_selected: user == gmodel.curUser}"> <div class="inner"> <div class="skin_cell" riot-style="background-image: url({user.skinUrlSmall})"></div> </div> <div class="cover"> </div> </div> </li> </ul> <div class="clear_both"></div>', 'user-list-tiled .entry,[data-is="user-list-tiled"] .entry{ position: relative; display: inline-block; width: 34px; height: 34px; float: left; cursor: pointer; } user-list-tiled .inner,[data-is="user-list-tiled"] .inner{ position: absolute; } user-list-tiled .cover,[data-is="user-list-tiled"] .cover{ position: absolute; width: 100%; height: 100%; } user-list-tiled .cover:hover,[data-is="user-list-tiled"] .cover:hover{ background-color: rgba(0, 128, 255, 0.1); } user-list-tiled .skin_cell,[data-is="user-list-tiled"] .skin_cell{ position: absolute; width: 32px; height: 32px; margin: 0px; }', '', function(opts) {

		this.userFilter = function(user){
			if(user == gmodel.selfUser) return false;

			if(opts.range == 'team'){
				return user.teamRoomSig == gmodel.selfUser.teamRoomSig;
			}

			if(opts.range == 'server'){
				return user.serverRoomSig == gmodel.selfUser.serverRoomSig;
			}
			return true;
		}.bind(this)

		this.onMouseDown = function(e){
			var user = e.item.user;
			if(e.button == 0){
				gmodel.SelectUser(user);
				gupdate();
			}
		}.bind(this)
});



riot.tag2('user-list-combo', '<select size="1" onchange="{onSelected}" ref="combo_selector"> <option>---</option> <option each="{user in gmodel.allUsers.array.filter(userFilter)}" riot-value="{user.userId}">{user.ListFullName}</option> </select>', 'user-list-combo select,[data-is="user-list-combo"] select{ width: 150px; height: 26px; font-size: 14px; } user-list-combo .entry,[data-is="user-list-combo"] .entry{ position: relative; display: inline-block; width: 34px; height: 34px; float: left; } user-list-combo .inner,[data-is="user-list-combo"] .inner{ position: absolute; } user-list-combo .cover,[data-is="user-list-combo"] .cover{ position: absolute; width: 100%; height: 100%; } user-list-combo .cover:hover,[data-is="user-list-combo"] .cover:hover{ background-color: rgba(0, 128, 255, 0.1); } user-list-combo .skin_cell,[data-is="user-list-combo"] .skin_cell{ position: absolute; width: 32px; height: 32px; margin: 0px; }', '', function(opts) {

	this.userFilter = function(user){
		if(user == gmodel.selfUser) return false;

		if(opts.range == 'team'){
			return user.teamRoomSig == gmodel.selfUser.teamRoomSig;
		}

		if(opts.range == 'server'){
			return user.serverRoomSig == gmodel.selfUser.serverRoomSig;
		}
		return true;
	}.bind(this)

	this.onSelected = function(e){

		var userId = e.target.value;
		if(userId){
			gmodel.SelectUserById(userId);
			gupdate();
			this.refs.combo_selector.selectedIndex = 0;
		}

	}.bind(this)

	this.onMouseDown = function(e){
		var user = e.item.user;
		if(e.button == 0){
			gmodel.SelectUser(user);
			gupdate();
		}
	}.bind(this)
});

riot.tag2('session-detail', '<div class="base" if="{gmodel.curSession != null}"> <div class="skin_cell" riot-style="background-image: url({gmodel.curSession.HeaderIcon})"></div> <div class="info_part"> <span class="name_text">{gmodel.curSession.HeaderName}</span> </div> </div>', 'session-detail .base,[data-is="session-detail"] .base{ padding: 8px; }', '', function(opts) {
});

riot.tag2('user-detail', '<div class="base_sd" oncontextmenu="{onContextMenu}" if="{gmodel.curUser}"> <div class="skin_cell" riot-style="background-image: url({gmodel.curUser.skinUrlSmall})"></div> <div class="info_part"> <span class="name_text">{gmodel.curUser.GameFullName}</span> <span class="trip" show="{gmodel.curUser.showTripKey}"> [{gmodel.curUser.shortTrip}] </span> <div class="trip" show="{gmodel.curUser.showTripKey}"> {gmodel.curUser.teamInfo} </div> <div class="profile_comment"> {gmodel.curUser.profileComment} </div> <div class="block_annotation" show="{gmodel.curUser.isBlocked}"> {gmodel.Texts.Blocked} </div> </div> <div class="layer1"> <div class="common_button" onclick="{onEditButtonClicked}" show="{gmodel.curUser == gmodel.selfUser}"> edit </div> </div> </div>', 'user-detail .trip,[data-is="user-detail"] .trip{ color:#00F; } user-detail .base_sd,[data-is="user-detail"] .base_sd{ height: 100%; padding: 8px; } user-detail .inner,[data-is="user-detail"] .inner{ } user-detail .layer1,[data-is="user-detail"] .layer1{ position: absolute; top: 8px; right: 8px; } user-detail .block_annotation,[data-is="user-detail"] .block_annotation{ color: red; } user-detail .edit_button,[data-is="user-detail"] .edit_button{ } user-detail .profile_comment,[data-is="user-detail"] .profile_comment{ word-wrap: break-word; }', '', function(opts) {
		this.onEditButtonClicked = function(){
			this.parent.parent.showProfileEditPane();
		}.bind(this)

		this.onContextMenu = function(e){

			if(gmodel.curUser.fullTrip != gmodel.selfUser.fullTrip){

				this.parent.parent.showMenu2();
				gupdate();
			}
			e.preventDefault();
			return false;
		}.bind(this)
});

riot.tag2('detailed-info-header', '<div class="base_area"> <session-detail show="{!gmodel.curUser}"></session-detail> <user-detail show="{gmodel.curUser}"></user-detail> </div>', 'detailed-info-header .base_area,[data-is="detailed-info-header"] .base_area{ height: 100%; } detailed-info-header .skin_cell,[data-is="detailed-info-header"] .skin_cell{ position: absolute; width: 60px; height: 60px; } detailed-info-header .info_part,[data-is="detailed-info-header"] .info_part{ width: 100%; padding-left: 70px; }', '', function(opts) {
});



riot.tag2('self-user-info', '<div class="base_area card" onclick="{onBaseClicked}" if="{gmodel.selfUser}"> <div class="skin_cell" riot-style="background-image: url({gmodel.selfUser.skinUrlSmall})"></div> <div class="name_text">{gmodel.selfUser.GameFullName}</div> </div>', 'self-user-info .base_area,[data-is="self-user-info"] .base_area{ position: relative; width: 190px; cursor: pointer; } self-user-info .skin_cell,[data-is="self-user-info"] .skin_cell{ position: absolute; left: 0; width: 32px; height: 32px; margin: 2px; } self-user-info .name_text,[data-is="self-user-info"] .name_text{ width: 185px; height: 37px; padding-left: 40px; line-height: 37px; user-select: none; overflow: hidden; }', '', function(opts) {
		this.onBaseClicked = function(){

			gmodel.SelectSelfUser();
			gmodel.FireChanged();
		}.bind(this)
});





riot.tag2('raw', '<span></span>', '', '', function(opts) {
  this.root.innerHTML = opts.html
});




riot.tag2('chat-timeline', '<div class="base_area" id="timeline_base_area" if="{gmodel.curSession != null}"> <ul> <li each="{msg in gmodel.curSession.messages.array}"> <div class="msg_outer" oncontextmenu="{onContextMenu}"> <div class="{layer0: true, highlighted: gmodel.curMessage == msg}"> <div class="skin_cell" riot-style="background-image: url({msg.icon})" title="{msg.userName + \', \' + msg.timeStamp}"></div> <div class="msg_content"> <div class="msg_text"> {msg.text} </div> </div> <div class="clear_both"></div> </div> </div> </div> </li> </ul> </div>', 'chat-timeline .base_area,[data-is="chat-timeline"] .base_area{ overflow-y: scroll; padding: 6px 8px; height: 100%; } chat-timeline .msg_outer,[data-is="chat-timeline"] .msg_outer{ //min-height: 40px; border: solid 0.5px rgba(0, 128, 255, 0.4); width: 100%; background-color: #FFF; padding: 0px; margin: 0 0 4px; border-radius: 6px; position: relative; } chat-timeline .layer0,[data-is="chat-timeline"] .layer0{ } chat-timeline .skin_cell,[data-is="chat-timeline"] .skin_cell{ float: left; width: 36px; height: 36px; margin: 4px; } chat-timeline .msg_content,[data-is="chat-timeline"] .msg_content{ padding-left: 48px; } chat-timeline .msg_info,[data-is="chat-timeline"] .msg_info{ font-size: 12px; position: absolute; right: 2px; bottom: 2px; color: #666; } chat-timeline .msg_text,[data-is="chat-timeline"] .msg_text{ padding: 4px; min-height: 44px; //width: 100%; word-wrap: break-word; } chat-timeline .highlighted,[data-is="chat-timeline"] .highlighted{ background-color: rgba(64,128,255,0.1); }', '', function(opts) {
		this.onContextMenu = function(e){
			var messageId = e.item.msg.messageId;
			var msg = gmodel.GetMessageById(messageId);
			if(msg.userId == gmodel.selfUser.userId){
				gmodel.SelectMessage(messageId);
				this.parent.showMenu1();
				gupdate();
			}
			e.preventDefault();
			return false;
		}.bind(this)
});

riot.tag2('message-input-box', '<textarea onkeyup="{editKeyUp}" disabled="{!gmodel.curSession || gmodel.curSession.isClosed}"></textarea>', 'message-input-box textarea,[data-is="message-input-box"] textarea{ width: 100%; height: 80px; font-size: 15px; resize: none; border: solid 1px rgba(64, 64, 128, 0.4); padding: 6px; border-radius: 4px; }', '', function(opts) {
		this.editKeyUp = function(e){
			if(e.keyCode == 13 && !e.shiftKey){
				var text = e.target.value.trim();
				if(text){
					gmodel.SendMessageOnCurrentSession(text);
					e.target.value = '';
					gupdate();
				}
			}
		}.bind(this)
});




riot.tag2('context-menu', '<div class="back_base" onclick="{onBaseClicked}" if="{this.shown}" oncontextmenu="{onDefaultContextMenu}"> <div class="overlay"> </div> <div class="menu_box" riot-style="top: {this.top + \'px\'}; left: {this.left + \'px\'}"> <yield></yield> </div> </div>', 'context-menu .back_base,[data-is="context-menu"] .back_base{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; } context-menu .overlay,[data-is="context-menu"] .overlay{ background-color: rgba(0, 0, 0, 0.0); width: 100%; height: 100%; //position: fixed; //top: 0; //left: 0; } context-menu .menu_box,[data-is="context-menu"] .menu_box{ width: 180px; height: 200px; background-color: #FFF; border: solid 1px #AAA; position: fixed; top: 50px; left: 50px; border-radius: 4px; padding: 4px; } context-menu li,[data-is="context-menu"] li{ //color: red; cursor: pointer; padding: 2px; } context-menu li:hover,[data-is="context-menu"] li:hover{ background-color: rgba(0, 128, 255, 0.2); }', '', function(opts) {

		this.shown = false;

		this.top = 10;
		this.left = 10;

		this.mouseX = 0;
		this.mouseY = 0;

		this.onBaseClicked = function(){
			this.shown = false;

			opts.on_menu_closed && opts.on_menu_closed();
		}.bind(this)

		$(window).on('mousedown', e => {

			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		});

		this.onDefaultContextMenu = function(e){
			e.preventDefault();
			return false;
		}.bind(this)

		this.show = function(){
			this.left = this.mouseX;
			this.top = this.mouseY;
			this.shown = true;
		}.bind(this)

		this.func1 = function(){
			console.log('func1');
		}.bind(this)

});


riot.tag2('profile-edit-pane-content', '<div class="panel_area"> <div> <div class="area_top_left"> </div> <div class="skin_cell" riot-style="background-image: url({gmodel.selfUser.skinUrlSmall})"></div> <div class="area_top_right"> <table> <tr> <td> {gmodel.Texts.Name} </td> <td> <input class="text_input" riot-value="{gmodel.selfUser.name}" readonly="true"> </td> </tr> <tr> <td> {gmodel.Texts.Skin} </td> <td> <input class="text_input" riot-value="{gmodel.selfUser.skinUrlSmall}" readonly="true"> </td> </tr> </table> </div> <div class="clear_both"></div> <div style="height:5px"></div> <div> <div> {gmodel.Texts.Comment} </div> <textarea ref="taComment">{gmodel.selfUser.profileComment}</textarea> <div style="height:5px"></div> <input type="checkbox" class="check_input" ref="ckbTripKey" checked="{gmodel.selfUser.showTripKey}">{gmodel.Texts.ShowTripKey} </div> <div class="common_button ok_button" onclick="{onOkClicked}">OK</div> </div> </div>', 'profile-edit-pane-content div,[data-is="profile-edit-pane-content"] div,profile-edit-pane-content td,[data-is="profile-edit-pane-content"] td{ font-size: 14px; } profile-edit-pane-content .skin_cell,[data-is="profile-edit-pane-content"] .skin_cell{ width: 60px; height: 60px; float: left; } profile-edit-pane-content .area_top_right,[data-is="profile-edit-pane-content"] .area_top_right{ float: left; margin-left: 10px; } profile-edit-pane-content input.text_input,[data-is="profile-edit-pane-content"] input.text_input{ width: 200px; height: 26px; border: solid 1px #888; border-radius: 2px; margin: 1px 0; padding: 4px; display: inline; background-color: #F0F0F0; } profile-edit-pane-content input.check_input,[data-is="profile-edit-pane-content"] input.check_input{ } profile-edit-pane-content textarea,[data-is="profile-edit-pane-content"] textarea{ width: 100%; height: 60px; padding: 4px; border-radius: 2px; resize: none; font-size: 15px; } profile-edit-pane-content .ok_button,[data-is="profile-edit-pane-content"] .ok_button{ position: absolute; right: 30px; bottom: 20px; } profile-edit-pane-content .panel_area,[data-is="profile-edit-pane-content"] .panel_area{ width: 380px; height: 255px; background-color: #FFF; border: solid 1px #AAA; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; border-radius: 4px; padding: 30px 30px; box-sizing: border-box; }', '', function(opts) {


		this.onOkClicked = function(){

			this.parent.parent.updateSelfProfileDetail(this.refs.ckbTripKey.checked, this.refs.taComment.value);
		}.bind(this)

});






riot.tag2('about-pane-content', '<div class="panel_area"> <h4>uni-chat</h4> <p>{gmodel.Texts.AppInstruction0}</p> <p>{gmodel.Texts.AppInstruction1}</p> </div>', 'about-pane-content h4,[data-is="about-pane-content"] h4{} about-pane-content p,[data-is="about-pane-content"] p{ font-size: 13px; } about-pane-content .panel_area,[data-is="about-pane-content"] .panel_area{ width: 400px; height: 300px; background-color: #FFF; border: solid 1px #AAA; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; border-radius: 4px; padding: 30px; box-sizing: border-box; }', '', function(opts) {

		this.onOkClicked = function(){

			this.parent.parent.updateSelfProfileDetail(this.ckbTripKey.checked, this.taComment.value);
		}.bind(this)

});



riot.tag2('main-menu-content', '<div class="panel_area"> <ul onclick="{onElementClicked}"> <li id="li_online"><img riot-src="{gmodel.IsUserActive ? \'gr/led_green.png\' : \'gr/led_blank.png\'}">{gmodel.Texts.Online}</li> <li id="li_offline"><img riot-src="{!gmodel.IsUserActive ? \'gr/led_red1.png\' : \'gr/led_blank.png\'}">{gmodel.Texts.Offline}</li> <li id="li_about"><img src="gr/led_blank.png">about</li> </ul> </div>', 'main-menu-content img,[data-is="main-menu-content"] img{ vertical-align: middle; } main-menu-content .panel_area,[data-is="main-menu-content"] .panel_area{ width: 150px; height: 150px; background-color: #FFF; border: solid 1px #AAA; position: absolute; left: 8px; top: 130px; border-radius: 3px; box-sizing: border-box; } main-menu-content li,[data-is="main-menu-content"] li{ cursor: pointer; padding: 2px 4px; user-select: none; } main-menu-content hr,[data-is="main-menu-content"] hr{ background-color: rgba(128,128,128, 0.5); border: none; height: 1px; } main-menu-content li:hover,[data-is="main-menu-content"] li:hover{ background-color: rgba(0, 128, 255, 0.2); }', '', function(opts) {


		this.onElementClicked = function(e){

			var id = e.target.id;
			if(id == 'li_online'){
				gmodel.SetUserActive(true);
			}else if(id == 'li_offline'){
				gmodel.SetUserActive(false);
			}else if(id == 'li_about'){
				this.parent.parent.showAboutBox();
			}

			this.parent.hide();
			gupdate();
		}.bind(this)

});


riot.tag2('foreground-pane', '<div class="back_base" if="{this.shown}" oncontextmenu="return false;"> <div class="overlay" onclick="{onBackClicked}" riot-style="opacity: {opts.darkout ? 1.0 : 0}"> </div> <yield></yield> </div>', 'foreground-pane .back_base,[data-is="foreground-pane"] .back_base{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; } foreground-pane .overlay,[data-is="foreground-pane"] .overlay{ background-color: rgba(0, 0, 0, 0.4); width: 100%; height: 100%; }', '', function(opts) {
		this.shown = false;

		this.onBackClicked = function(){
			this.shown = false;
			opts.on_panel_closed && opts.on_panel_closed();
		}.bind(this)

		this.show = function(){
			this.shown = true;
		}.bind(this)

		this.hide = function(){
			this.shown = false;
		}.bind(this)
});

riot.tag2('status-content', '<div show="{!gmodel.isAvailable}"> no connection to chat server. </div>', '', '', function(opts) {
});

riot.tag2('app-root', '<div class="page_root" id="app_root"> <div class="top_fixed_area"> <div class="top_layer0"> <div class="top_ad_area"> <div class="top_ad_stub">{gmodel.Texts.Advertisement}</div> </div> <div class="head_part"> <div class="app_title_box"> <div class="menu_button" onmousedown="{onMenuButtonClicked}"> menu </div> <div class="app_title_text">uni-chat</div> </div> <div class="user_entry_profile_box"> <self-user-info></self-user-info> </div> <div class="clear_both"></div> </div> </div> </div> <div class="main_content_area"> <div class="user_list_area app_content"> <div>{gmodel.Texts.Sessions}</div> <session-list></session-list> <hr class="spacer_list"> <div>{gmodel.Texts.TeamMembers}</div> <user-list-tiled range="team"></user-list-tiled> <hr class="spacer_list"> <div>{gmodel.Texts.AllUsers}</div> <user-list-combo range="server"></user-list-combo> </div> <div class="current_session_area app_content"> <div class="current_session_area_inner"> <div class="session_header_area"> <detailed-info-header></detailed-info-header> </div> <div class="session_timeline_area"> <chat-timeline></chat-timeline> </div> <message-input-box></message-input-box> </div> </div> <div class="clear_both"></div> </div> <div class="bottom_fixed_area"> <div class="bottom_content"> <status-content ref="status1"></status-content> </div> </div> <context-menu on_menu_closed="{onMenu1Closed}" ref="menu1"> <li onclick="{parent.onMenu1RemoveMessageClicked}">🔹{gmodel.Texts.DeleteMessage}</li> </context-menu> <context-menu on_menu_closed="{onMenu2Closed}" ref="menu2"> <li onclick="{parent.onMenu2BlockUserClicked}">🔹{gmodel.Texts.BlockUnblock}</li> </context-menu> <foreground-pane ref="fgpane1" darkout="{true}"> <profile-edit-pane-content ref="profile_edit_pane_content"></profile-edit-pane-content> </foreground-pane> <foreground-pane ref="main_menu_pane" darkout="{false}"> <main-menu-content></main-menu-content> </foreground-pane> <foreground-pane ref="about_pane" darkout="{true}"> <about-pane-content></about-pane-content> </foreground-pane> </div>', 'app-root{ width: 100%; height: 100%; overflow-x: hidden; overflow-y: hidden; } app-root .page_root,[data-is="app-root"] .page_root{ width: 100%; height: 100%; overflow-x: hidden; overflow-y: hidden; } app-root .top_fixed_area,[data-is="app-root"] .top_fixed_area{ width: 100%; height: 140px; position: relative; } app-root .main_content_area,[data-is="app-root"] .main_content_area{ height: calc(100% - 140px - 40px); } app-root .bottom_fixed_area,[data-is="app-root"] .bottom_fixed_area{ width: 100%; height: 40px; } app-root .top_ad_area,[data-is="app-root"] .top_ad_area{ overflow-x: hidden; } app-root .top_layer0,[data-is="app-root"] .top_layer0{ width: 100%; position: absolute; // height: 90px; } app-root .top_ad_stub,[data-is="app-root"] .top_ad_stub{ width: 728px; height: 90px; margin: 0 auto; background-color: #EEF8FF; } app-root .head_part,[data-is="app-root"] .head_part{ //background-color: #FEE; background-color: #CDF; border: solid 1px #08F; padding: 4px; height: 50px; } app-root .about_button,[data-is="app-root"] .about_button{ background-color: #EEE; border: solid 0.5px rgba(128, 128, 128, 0.5); //#888; border-radius: 4px; position: absolute; right: 0; width: 60px; height: 30px; line-height: 30px; text-align: center; color: #888; cursor: pointer; } app-root .common_button,[data-is="app-root"] .common_button{ background-color: #EEE; border: solid 0.5px rgba(128, 128, 128, 0.7); border-radius: 4px; width: 54px; height: 28px; line-height: 30px; text-align: center; color: #777; cursor: pointer; user-select: none; } app-root .menu_button,[data-is="app-root"] .menu_button{ background-color: #EEE; border: solid 0.5px rgba(128, 128, 128, 0.8); border-radius: 0px; position: absolute; left: 8px; top: 5px; width: 54px; height: 30px; line-height: 30px; text-align: center; color: #666; cursor: pointer; user-select: none; } app-root .app_title_box,[data-is="app-root"] .app_title_box{ //float: left; position: absolute; left: 0; } app-root .app_title_text,[data-is="app-root"] .app_title_text{ font-size: 28px; //color: #F08; color: #06D; line-height: 42px; margin-left: 70px; } app-root .user_entry_profile_box,[data-is="app-root"] .user_entry_profile_box{ position: absolute; right: 8px; } app-root .user_list_area,[data-is="app-root"] .user_list_area{ //background-color: #EEF5FF; //background-color: #EFE; //border: solid 1px #8C8; width: 232px; height: 100%; float: left; padding: 8px 6px; overflow-x: hidden; overflow-y: scroll; } app-root .app_content,[data-is="app-root"] .app_content{ // background-color: #EEE; //background-color: #EFE; background-color: #EEF5FF; // background-color: #C8C8C8; //border: solid 1px #8C8; border: solid 1px #88A7E4; } app-root .current_session_area,[data-is="app-root"] .current_session_area{ overflow-x: hidden; padding: 8px; height: 100%; overflow-y: hidden; } app-root .current_session_area_inner,[data-is="app-root"] .current_session_area_inner{ position: relative; height: 100%; } app-root .session_header_area,[data-is="app-root"] .session_header_area{ border: solid 1px rgba(0, 128, 255, 0.5); height: 100px; background-color: rgba(212, 244, 255, 1.0); border-radius: 4px; } app-root .session_timeline_area,[data-is="app-root"] .session_timeline_area{ border: solid 1px rgba(64, 64, 255, 0.3); background-color: #CEF; border-radius: 4px; margin: 6px 0; width: 100%; height: calc(100% - 190px); } app-root .bottom_content,[data-is="app-root"] .bottom_content{ height: 40px; background-color: #EEE; border: solid 1px #CCC; padding: 4px; padding-left: 8px; } app-root .list_header,[data-is="app-root"] .list_header{ color:#00C; font-size: 14px; // background-color: #FFF; } app-root .spacer_list,[data-is="app-root"] .spacer_list{ height: 5px; opacity: 0; } app-root *,[data-is="app-root"] *{ margin: 0; padding: 0; box-sizing: border-box; } app-root *,[data-is="app-root"] *{ font-family: \'Meiryo\', \'Arial\'; } app-root textarea,[data-is="app-root"] textarea{ font-family: \'Meiryo\', \'Arial\'; } app-root ul,[data-is="app-root"] ul,app-root li,[data-is="app-root"] li{ list-style: none; } app-root .clear_both,[data-is="app-root"] .clear_both{ clear: both; } app-root .card,[data-is="app-root"] .card{ border: solid 1px rgba(0, 128, 240, 0.5); background-color: #F4FCFF; border-radius: 4px; } app-root .card_selected,[data-is="app-root"] .card_selected{ background-color: #AEF; } app-root .skin_cell,[data-is="app-root"] .skin_cell{ background-size: cover; background-position: center center; border-radius: 20%; }', '', function(opts) {


	$(window).on('keydown', (e) => {

		var key = e.keyCode;
		if(key == 65){

		}
	});

	this.showMenu1 = function(){

		this.refs.menu1.show();
		this.update();
	}.bind(this)

	this.showMenu2 = function(){
		this.refs.menu2.show();
		this.update();
	}.bind(this)

	this.onMenuButtonClicked = function(){
		this.refs.main_menu_pane.show();
	}.bind(this)

	this.onMenu1RemoveMessageClicked = function(){

		gmodel.DeleteCurrentMessage();
	}.bind(this)

	this.onMenu2BlockUserClicked = function(){
		gmodel.SetUserBlockState(gmodel.curUser, !gmodel.curUser.isBlocked);
		gupdate();
	}.bind(this)

	this.onMenu1Closed = function(){

		gmodel.curMessage = null;
		this.update();
	}.bind(this)

	this.onMenu2Closed = function(){

	}.bind(this)

	this.showProfileEditPane = function(){

		this.refs.fgpane1.show();

		gupdate();
	}.bind(this)

	this.showAboutBox = function(){
		this.refs.about_pane.show();
	}.bind(this)
	this.updateSelfProfileDetail = function(showTrip, commentText){

		gmodel.UpdateSelfProfileDetail(showTrip, commentText);
		this.refs.fgpane1.hide();
		gupdate();
	}.bind(this)

	this.start = function(){
		gupdate = this.update.bind(this);
		gmodel = window.opener.chatAppModel;
		console.log('chat_tags_161205');

		gmodel.procOnChanged = () => {
			this.update();
			if(gmodel.curSession && gmodel.curSession.reqScroll){
				var tl = $("#timeline_base_area")[0];
				if(tl){
					tl.scrollTop = tl.scrollHeight;
				}
			}
		}

		gmodel.chatNotificationTitleProc = (st) => {
			document.title = st ? '★new message!' : 'unichat';
		}

		gmodel.ChatWindowOpenStateChanged(true);

		document.addEventListener('visibilitychange', () => {
			var visible = !document.hidden;
			gmodel.ChatWindowOpenStateChanged(visible);
		});

		window.onbeforeunload = () => {
			gmodel.ChatWindowOpenStateChanged(false);
		}

		if(window.opener){
			window.opener.onbeforeunload = () => {
				window.close();
			};
		}

	}.bind(this)

	this.start();

});
