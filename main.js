var playlist = document.querySelector(".container_sub2-item2__playlist");
const heads = document.querySelector('.header_h1');
const heads1 = document.querySelector('.header_p');
const cd = document.querySelector('.cd_img');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const preBtn = document.querySelector('.previous');
const isPlay = false;
const playingBtn = document.querySelector('.playing');
const timeStart = document.querySelector('.timer_start');
const timeEnd = document.querySelector('.timer_end');
const progessbar = document.querySelector('.progessbar');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
const background1 = document.querySelector('.main_sub1')

var playlist;

const app = {
  currentIndex: 0, 
  songs: [
    {
      name: "Đừng quên tên anh",
      singer: "Hoa Vinh",
      path: "./nhac/dungquentenanh.mp3",
      image: "./anh/dungquentenanh.jpg",
    },
    {
      name: "Thu Cuối",
      singer: "YanBi",
      path: "./nhac/thucuoi.mp3",
      image: "./anh/thucuoi.jpg",
    },

    {
      name: "Lửng lơ",
      singer: "MASEW x BRAY",
      path: "./nhac/lunglo.mp3",
      image: "./anh/lunglo.jpg",
    },
    {
      name: "Như anh đã thấy",
      singer: "PhucXp ft. Freak D",
      path: "./nhac/nhuanhdathay.mp3",
      image: "./anh/nhuanhdathay.jpg",
    },
    {
      name: "Người Như Chúng Ta",
      singer: "Mr.Siro",
      path: "./nhac/nguoinhuchungta.mp3",
      image: "./anh/nguoinhuchungta.jpg",
    },
    {
      name: "Dưới Những Cơn Mưa",
      singer: "Mr.Siro",
      path: "./nhac/duoinhungconmua.mp3",
      image: "./anh/duoinhungconmua.jpg",
    },
    {
      name: "LIÊN KHÚC THẤT TÌNH REMAKE",
      singer: "TRỊNH ĐÌNH QUANG",
      path: "./nhac/lkthattinh.mp3",
      image: "./anh/lkthattinh.jpg",
    },
  ],
  getCurrentSong: function(){
    return this.songs[this.currentIndex];
  },
  loadCurrentSong: function(){
    heads.innerHTML = this.getCurrentSong().name;
    heads1.innerHTML = this.getCurrentSong().singer;
    cd.src = this.getCurrentSong().image;
    audio.src = this.getCurrentSong().path;
    

  },
  nextSong: function(){
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  previousSong: function(){
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length-1;
    }
    this.loadCurrentSong();
  },
  
  SecondsToTime: function  (d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    if (hDisplay != "") {
        return (hDisplay.length > 1 ? hDisplay : '0' + hDisplay) + ":" + (mDisplay.length > 1 ? mDisplay : '0' + mDisplay) + ":" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
    }
    else if (mDisplay != "") {
        return (mDisplay.length > 1 ? mDisplay : '0' + mDisplay) + ":" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
    }
    else if (sDisplay != "") {
        return "00:" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
    }
    return "00:00"
},
getTime: function(){
  const seconds = audio.duration;
  timeEnd.innerHTML = this.SecondsToTime(seconds)
  
},
setbackGround: function(){
  background1.style.backgroundColor = 'white';
},

  handleEvent: function(){
      window.onload = function(){
        app.getTime();
        const playlist = document.querySelector('.playlistt');
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')){
              if(songNode){
                app.currentIndex = songNode.dataset.index;
                app.loadCurrentSong();
                audio.play();
                app.render();
               
              }
            }
        }
        
      }
      moon.onclick = function(){
        console.log(123);
        app.setbackGround();
       
     }
      // quay cd
      const cdAnimate = cd.animate([
        {
          transform: 'rotate(360deg)'
        }
      ],{
        duration:12000,
        iterations: Infinity
      })
      cdAnimate.pause();
      //onclick
      playBtn.onclick = function(){
        if(app.isPlay){
          audio.pause();
        }
        else{
          audio.play();  
        }
      } 
      // play
      audio.onplay = function(){
          app.isPlay = true;
          playingBtn.classList.add('bx-play');  
          cdAnimate.play();
      }
      //pause
      audio.onpause = function(){
        app.isPlay = false;
        playingBtn.classList.remove('bx-play');
        cdAnimate.pause();
      }
      audio.ontimeupdate = function(){
        const progessbarPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progessbar.value = progessbarPercent;
        const timeCr = audio.currentTime;
        timeStart.innerHTML = app.SecondsToTime(timeCr);
       
      }
      progessbar.onchange = function(e){
        const changeTime = audio.duration / 100 * e.target.value;
        audio.currentTime = changeTime;
      }
      //click chuyen bai
      nextBtn.onclick = function(){
        app.getTime();
        app.nextSong();
        audio.play();
        app.render();
        
      }
      //click lui bai
      preBtn.onclick = function(){
        app.getTime();
        app.previousSong();
        audio.play();
       
        app.render();
      }
      audio.onended = function(){
        nextBtn.click();
      }
      // doi background
    
     

      


  },

  render: function () {
    const htmls = this.songs.map((song,index) => {
      return `<div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="p_head">
                <i class='bx bxs-music' ></i>
                <img src="${song.image}" class="head_image" alt="">
            </div>
            <div class="p_body">
                <h1 class="nameSong">
                    ${song.name} 
                </h1>
                <p class="author">
                    ${song.singer}
                </p>
              
            </div>
                <div class="p_option">
                    <i class='bx bx-dots-horizontal-rounded'></i>
                </div>
            </div>`;
    });
    playlist.innerHTML = htmls.join("");
    
   
  },

  start: function () {
    
    this.loadCurrentSong();

    this.handleEvent();
    this.render();
    
  
  },
};
app.start();
