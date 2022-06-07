const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const setting = $('.header__info-item-setting')
const playlist = $('.content__playlist')
const content = $('.content')
const songHeader = $('.content__song p')
const cdThumb = $('.song__cd img')
const audio = $('.song__audio')
const playBtn = $('.song__btn-change')
const progress = $('.song__progress')
const nextBtn = $('.song__btn--next')
const prevBtn = $('.song__btn--back')
const randomBtn = $('.song__btn--random')
const repeatBtn = $('.song__btn--again')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs : [
        {
            name: 'Răng Khôn',
            singer: 'Phí Phương Anh, Rin9',
            path: './assest/songs/RangKhon.mp3',
            img: './assest/image/rangkhon.jpg',
        },
        {
            name: 'Chờ Ngày Em Cưới',
            singer: 'Phát Hồ, Hương Ly',
            path: './assest/songs/ChoNgayEmCuoi.mp3',
            img: './assest/image/chongayemcuoi.jpg',
        },
        {
            name: 'Có Em Đây',
            singer: 'Như Việt, Dung Hoàng',
            path: './assest/songs/CoEmDay.mp3',
            img: './assest/image/coemday.jpg',
        },
        {
            name: 'Cùng Anh',
            singer: 'Ngọc Dolil, NIB',
            path: './assest/songs/CungAnh.mp3',
            img: './assest/image/cunganh.jpg',
        },
        {
            name: 'Cứ Thở Đi',
            singer: 'Đức Phúc, JukySan',
            path: './assest/songs/CuThoDi.mp3',
            img: './assest/image/cuthodi.jpg',
        },
        {
            name: 'Diễn Viên',
            singer: 'Ngô Anh Đạt',
            path: './assest/songs/DienVien.mp3',
            img: './assest/image/dienvien.jpg',
        },
        {
            name: 'Không Bằng',
            singer: 'Na',
            path: './assest/songs/KhongBang.mp3',
            img: './assest/image/khongbang.jpg',
        },
        {
            name: 'Muốn Em La',
            singer: 'Kyo',
            path: './assest/songs/MuonEmLa.mp3',
            img: './assest/image/muonemla.jpg',
        },
        {
            name: 'Pháo Hoa',
            singer: 'Phí Phương Anh, Rin9, Miina',
            path: './assest/songs/PhaoHoa.mp3',
            img: './assest/image/phaohoa.jpg',
        },
        {
            name: 'Yêu Đơn Phương Là Gì',
            singer: 'H0n',
            path: './assest/songs/YeuDonPhuongLaGi.mp3',
            img: './assest/image/yeudonphuonglagi.jpg',
        },
    ],
    render: function(){
        const htmls = this.songs.map(function(song,index){
            return `
                    <div class="playlist__song ${index === app.currentIndex ? 'active' : ''}" data-index=${index}>
                        <div class="playlist__thump" style="background-image:url('${song.img}');">
                            
                        </div>
                        <div class="playlist__name">
                            <h3 class="playlist__name-song">${song.name}</h3>
                            <p class="playlist__name-singer">${song.singer}</p>
                        </div>
                        <div class="playlist__icon">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        //Khi click nut play
        playBtn.onclick = function(){
            if(app.isPlaying){        
                audio.pause()
                
            }else{             
                audio.play()
            }
        }
        // Khi nhac duoc play
        audio.onplay = function(){
            app.isPlaying = true
            content.classList.add('playing')
            autoCd.play()
        }
        // Khi nhac pause
        audio.onpause = function(){
            app.isPlaying = false
            content.classList.remove('playing')
            autoCd.pause()
        }

        //cd rotate
        const autoCd = cdThumb.animate(
            [{transform: 'rotate(360deg)'}],
            {
                duration: 10000,
                iterations: Infinity,
            }
        )
        autoCd.pause()

        //Thanh progress chạy theo tiến độ bài hát
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent
            }
        }

        // Tua bài hát bằng thanh progress
        progress.oninput = function(){
            const seek = Math.floor(audio.duration/100*progress.value)
            audio.currentTime = seek
        }

        //Khi click next
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            }else{
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToView()
        }

        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong()
            }else{
                app.prevSong()
            }
            audio.play()
            app.render()
            app.scrollToView()
        }

        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active',app.isRandom)
        }

        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active',app.isRepeat)
        }

        audio.onended = function(){
            if(app.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }

        playlist.onclick = function(e){
            const songNode = e.target.closest('.playlist__song:not(.active)')
            if(songNode){
                app.currentIndex = Number(songNode.dataset.index)
                app.render()
                app.loadCurrentSong()
                audio.play()
            }
        }

        setting.onclick = function(){
            setting.classList.toggle('active')
        }

    },

    loadCurrentSong: function(){
        songHeader.innerText = this.currentSong.name
        cdThumb.src = this.currentSong.img
        audio.src = this.currentSong.path
    },

    nextSong: function(){
        this.currentIndex++
        if(app.currentIndex >= app.songs.length){
            app.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(app.currentIndex < 0) {
            app.currentIndex = app.songs.length-1;
        }
        this.loadCurrentSong()
    },

    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * app.songs.length)
        }while(newIndex === app.currentIndex)
        app.currentIndex = newIndex
        this.loadCurrentSong()
    },

    scrollToView: function(){
        setTimeout(function(){
            $('.playlist__song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        },500)
    },

    start: function(){
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }
}
app.start()