//用jquery库来弄
$(function(){
	var timuList = null;
	var currtentTimu = null;
	var jsq = null;
	var isDati = false;
	var score =0;
	var timuNum = 10;
	//点击开始答题切换到下一页
	$(".startGame button").click(function (e) {
		$(".page").css("z-index","0");
		$(".gamimg").css("z-index","1")
		//获取答题数据库
		$.get("dati.json").then(function (res) {
			console.log(res)
			timuList = res;
			//渲染到页面
			renderTimu();
		})
	})
	
	function renderTimu () {
		timuNum--
		if(timuNum<0){
			$('.page').css("z-index","0")
			//让结束界面层为1
			$('.endGame').css("z-index","1")
			
			$('.score').html(score)
			
			return null;
		}
		var sec = 10;
		//根据题目长度随机出题
		var randomNum = parseInt(Math.random()*timuList.length)
		console.log(randomNum)
		currtentTimu = timuList.splice(randomNum,1)
		isDati = false;
		console.log(currtentTimu)
		//渲染到页面上
		$(".gamimg h3").html(currtentTimu[0].quiz)
		$(".option").html("")
		currtentTimu[0].options.forEach(function (item,index) {
			$(".option").append(`
				<li data-index =${index}>${index+1}、${item}</li>
				`)
		})
		jsq = setInterval(function (){
			if(sec == 0){
				clearTimeout(jsq)
				console.log(currtentTimu[0].answer-1)
				$('.option li:eq('+(currtentTimu[0].answer-1)+')').css('background',"skyblue")
				
				setTimeout(function(){
					renderTimu()
				},2000)
				isDati = true;
			}else{
				
				$('.syTime').html(sec)
				sec--;
			}
		},1000)
		
	}
	//监听选项列表的点击事件
	$('.option').click(function (e) {
		if(e.target.tagName=='LI'&&!isDati){
			isDati = true;
			var index = e.target.dataset.index
			console.log(index)
			console.log(currtentTimu[0].answer)
			var answer = parseInt(index)+1
			console.log(answer)
			if(answer==currtentTimu[0].answer){
				score +=10
				console.log(score)
				console.log($(e.target))
				$(e.target).css('background',"skyblue")
			}else{
				console.log('答错了')
				console.log(score)
				$(e.target).css('background',"deeppink")
				$('.option li:eq('+(currtentTimu[0].answer-1)+')').css('background',"skyblue")
			}
			clearTimeout(jsq)
			setTimeout(function(){
				renderTimu()
			},1000)
		}
	})
	//再来一次
	$('.endGame button').click(function () {
		location.reload()
	})
	
	
})