import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <div className='footericon'>
            <div>
                <a href='#'><img src='./img/facebook_icon.svg'/></a>
                <a href='#'><img src='./img/instagram_icon.svg'/></a>
                <a href='#'><img src='./img/twitter_icon.svg'/></a>
                <a href='#'><img src='./img/youtube_icon.svg'/></a>
            </div>
            <NavLink to="/"><h1>Jiflix</h1></NavLink>
        </div>
        <div className='footerGrid'>
            <NavLink to="/">화면 해설</NavLink> 
            <NavLink to="/">고객 센터</NavLink> 
            <NavLink to="/">기프트카드</NavLink> 
            <NavLink to="/">미디어 센터</NavLink> 
            <NavLink to="/">투자 정보(IR)</NavLink> 
            <NavLink to="/">입사 정보</NavLink> 
            <NavLink to="/">이용 약관</NavLink> 
            <NavLink to="/">개인정보</NavLink> 
            <NavLink to="/">법적 고지</NavLink> 
            <NavLink to="/">쿠키 설정</NavLink> 
            <NavLink to="/">회사 정보</NavLink> 
            <NavLink to="/">문의하기</NavLink> 
        </div>
    </footer>
  )
}

export default Footer