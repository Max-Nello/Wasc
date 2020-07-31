


// window.addEventListener('load', function(){
	var mask = document.querySelector('.mask').style.display = 'block';
	var video_box = document.querySelector('.video_con').style.display = 'flex';
	var video = document.querySelector('.video').style.display = 'block';
// })
	
	function lock(text){
		var div = document.createElement('div');
		var body = document.body;
		
		div.className = 'window_Box';
		div.innerHTML = '<span class="iconfont iconchenggong3"></span>' + text + '。';
		
		body.insertBefore(div, body.children[0]);
		var timer = setInterval(function(){
				body.removeChild(div);
				clearInterval(timer);
			},2000);
		}
var app = new Vue({
	el: '#app',
	data: { 
		//查询歌曲
		query: '',
		//歌曲表单
		musicList: [],
		//歌曲地址
		musicUrl: 'http://m8.music.126.net/20200726044820/3f2594edad1f907b29c27c0ed8a23b25/ymusic/5411/3210/7211/ba2629b94155def8b4826d3c76ed1202.mp3',
		//歌曲封面
		musicCover: '',
		//歌曲评论
		hotComment: [],
		//PC唱片动画
		isPlaying: false,	
		//遮罩层的显示状态
		isShow: false,
		//mv地址
		mvUrl: '',
		//换肤
		huanfushow: false,
	},
	methods: {
		//搜索歌曲
		searchMusic: function() {
			var that = this;
			axios.get('https://autumnfish.cn/search?keywords=' + this.query)
				.then(function(response) {
					that.musicList = response.data.result.songs;
				}, function(err) {
					
				})
		},
		//播放歌曲
		playMusic: function(musicId) {
			var that = this;
			axios.get("https://autumnfish.cn/song/url?id=" + musicId)
				.then(function(response) {
					that.musicUrl = response.data.data[0].url;
				}, function(err) {

				})
				
			//歌曲热评
			axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
				.then(function(response) {
					that.hotComment = response.data.hotComments;
				}, function(err) {

				})

			//歌曲封面地址
			axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
				.then(function(response) {
					that.musicCover = response.data.songs[0].al.picUrl;
				}, function(err) {

				})
		},
		//pc唱片动画开
		play:function(){
			this.isPlaying = true;
		},
		//pc唱片动画关
		pause:function(){
			this.isPlaying = false;
		},
		//播放mv
		playMV:function(mvid){
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
			.then(function(response){
				that.isShow = true;
				that.mvUrl = response.data.data.url;
			}, function(arr){
				
			})
		},
		//mv遮罩层显示
		hide:function(){
			this.isShow = false;
		},
		
		//进入mv关闭音乐
		li_hide:function(){
			setTimeout(function(){
				app.musicUrl = '';
			},100)
		},
		
		shows:function(){
			this.huanfushow = !this.huanfushow;
		},
	}
})



