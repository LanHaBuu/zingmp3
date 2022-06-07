const contentPlaylist = document.querySelector('.content__showplaylist') //review

const btnPlaylistLeft = document.querySelector('.playlist__heading-control .playlist__control--left')
const btnPlaylistRight = document.querySelector('.playlist__heading-control .playlist__control--right')
const playlistList = document.querySelector('.content__playlist-list') //reviewbox
const playlistItem = document.querySelectorAll('.content__playlit-item') //box

const btnAlbumLeft = document.querySelector('.album__control--left')
const btnAlbumRight = document.querySelector('.album__control--right')
const albumList = document.querySelector('.content__album-list') //reviewbox
const albumItem = document.querySelectorAll('.content__album-item') //box

const btnMvLeft = document.querySelector('.mv__control--left')
const btnMvRight = document.querySelector('.mv__control--right')
const mvList = document.querySelector('.content__mv-list') //reviewbox
const mvItem = document.querySelectorAll('.content__mv-item') //box


const btnArtistLeft = document.querySelector('.artist__control--left')
const btnArtistRight = document.querySelector('.artist__control--right')
const artistList = document.querySelector('.content__artist-list') //reviewbox
const artistItem = document.querySelectorAll('.content__artist-item') //box

document.addEventListener('DOMContentLoaded', function () {
    // responsive
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1366) {
            showSlide(5,5,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
            showSlide(4,2,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
            showSlide(3,3,mvList,mvItem,btnMvLeft,btnMvRight)
            showSlide(5,5,artistList,artistItem,btnArtistLeft,btnArtistRight)
        } else if (window.innerWidth >= 992) {
            showSlide(3,3,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
            showSlide(2,2,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
            showSlide(2,2,mvList,mvItem,btnMvLeft,btnMvRight)
            showSlide(3,3,artistList,artistItem,btnArtistLeft,btnArtistRight)
        } else {
            showSlide(1,1,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
            showSlide(1,1,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
            showSlide(1,1,mvList,mvItem,btnMvLeft,btnMvRight)
            showSlide(1,1,artistList,artistItem,btnArtistLeft,btnArtistRight)

        }
    });

    const media = [
        window.matchMedia('(min-width: 1366px)'),
        window.matchMedia('(min-width: 992px)'),
    ];

    if (media[0].matches) {
        showSlide(5,5,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
        showSlide(4,2,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
        showSlide(3,3,mvList,mvItem,btnMvLeft,btnMvRight)
        showSlide(5,5,artistList,artistItem,btnArtistLeft,btnArtistRight)

    } else if (media[1].matches) {
        showSlide(3,3,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
        showSlide(2,2,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
        showSlide(2,2,mvList,mvItem,btnMvLeft,btnMvRight)
        showSlide(3,3,artistList,artistItem,btnArtistLeft,btnArtistRight)

    } else {
        showSlide(1,1,playlistList,playlistItem,btnPlaylistLeft,btnPlaylistRight)
        showSlide(1,1,albumList,albumItem,btnAlbumLeft,btnAlbumRight)
        showSlide(1,1,mvList,mvItem,btnMvLeft,btnMvRight)
        showSlide(1,1,artistList,artistItem,btnArtistLeft,btnArtistRight)

    }
});


function showSlide(slideAppear, numberSlideMove, reviewbox, box, btnLeft, btnRight) {
    const widthItem = contentPlaylist.offsetWidth / slideAppear
    const widthAllItem = widthItem * box.length
    reviewbox.style.width = widthAllItem + 'px'

    box.forEach(item => {
        item.style.marginRight = '32px'
        item.style.width = `${widthItem - 32}px`;
    })

    let count = 0
    let spacing = widthAllItem - slideAppear * widthItem
    btnRight.onclick = function() {
        count += widthItem * numberSlideMove
        if(count > spacing) {
            count = 0
        }
        reviewbox.style.transform = `translateX(${-count}px)`
    }

    btnLeft.onclick = function() {
        count -= widthItem * numberSlideMove
        if(count < 0) {
            count = spacing
        }
        reviewbox.style.transform = `translateX(${-count}px)`
    }

}



