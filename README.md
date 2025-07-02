![Image](https://github.com/user-attachments/assets/1b3ac61b-9b28-40f6-9430-4cf43443c85b)

> TMDB Open API를 활용해 실제 영화 데이터를 연동하고, 사용자가 원하는 영화를 검색해 찾을 수 있도록 구현했습니다. <br>
> 리스트에서 마우스를 올리는 것만으로 별점, 장르 등 주요 정보를 빠르게 확인할 수 있으며,<br>
> 유사 콘텐츠까지 자연스럽게 탐색할 수 있도록 사용자 경험을 고민하며 완성한, 저의 **첫번째 React 프로젝트**입니다.


## 🎥 요약

#### 1. **주제**

- TMDB Open API를 활용해 실시간 영화와 TV 정보를 제공하는 React 기반 웹 애플리케이션 개발

#### 2. **목표**

* TMDB API를 통한 인기 및 평점 기반 콘텐츠 조회 및 화면 표시
* 사용자 친화적인 인터페이스로 영화 및 TV 콘텐츠를 쉽고 빠르게 검색할 수 있도록 구현
* 마우스 호버 시 별점, 장르 등 주요 정보를 직관적으로 확인할 수 있게 UX 개선
* 유사 콘텐츠 추천 기능으로 자연스러운 탐색 흐름 제공
* React 컴포넌트 구조와 상태 관리, 라우팅을 직접 구현하여 실전 경험 쌓기

#### 3. **개발 환경**

* React, JavaScript (ES6+), Axios

#### 4. **기간**

* 2025.03.10 ~ 2025.03.12<br>
추가작업 ⇒ 2025.06.30 ~ 2025.07.02

## 🔗 배포 URL

* https://jiflix.vercel.app


## 📌 주요 기능

* Axios를 통한 TMDB API 비동기 데이터 통신
* 인기(popular) 및 평점 기반(top_rated) 영화/TV 콘텐츠 조회
* 키워드 기반 영화 및 TV 프로그램 검색 기능
* 마우스 호버 시 별점, 장르 등 주요 정보 표시
* 선택한 콘텐츠의 유사 작품 추천 기능
* Swiper를 이용한 슬라이더 UI 구현
* React Router를 활용한 SPA 기반 페이지 라우팅


## 💼 프로젝트 폴더 구조

```
🎥jiflix
 ┣ 📂public
 ┃ ┣ 📂img
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂component             # 컴포넌트 폴더
 ┃ ┃ ┗ 📂homebottom
 ┃ ┣ 📂pages                 # 주요 페이지 컴포넌트 폴더
 ┃ ┃ ┣ 📜Dateil.jsx          # 콘텐츠 상세 페이지
 ┃ ┃ ┣ 📜Home.jsx            # 메인 홈 페이지
 ┃ ┃ ┗ 📜Movie.jsx           # 영화/TV 리스트 페이지
 ┣ 📜movieState.js           # 전역 상태 관리 (zustand)
 ┣ 📜app.js                  # 앱의 진입점, 전체 라우팅 구성 파일
 ┣ 📜style.scss              # 전체 스타일 설정 파일
 ┣ 📜_res-style.scss         # 반응형
 ┗ 📜README.md
```

## 🛠️ 사용 기술

### 1. Frond-End

| 사용기술 | 설명 |Badge |
| :---:| :---: | :---: |
| **React** | **프론트엔드 프레임워크 (SPA 구축)** |![react](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)|
|**React Router Dom** | **페이지 라우팅 관리** |![reactrouter](https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white)|
|**JavaScript (ES6+)** | **주요 개발 언어** |![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white)|
|**SCSS** | **스타일 전처리기** |![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)|
| **Axios** | **HTTP 클라이언트 라이브러리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|
|**Zustand** | **상태 관리**|![Zustand](https://img.shields.io/badge/Zustand-181717?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAv0lEQVQ4jeVUMQ7DIAx0KmZGlJGJB+RBjLyC1/ADVr7AC8gzCBJs7lCpUhqw0qpDqp7kxSefDWd5QkQYwVqLQogh/4oYIwAiDiOlhO/AOYe30+1P4g8FGUUqpSaC7q4Hs9ai1rorFkJAKeUuX0qBZVmGjZgQApRSXVJKeeByzsTQv2DK911urXX/hXMOpZQDt20bcM67NbVWmKjj8AnIJ6/rivDYt2fknMkJrm/K9QXJ4+C9h3med7laKxhjhjV3vjqJYwKihcAAAAAASUVORK5CYII=&logoColor=white)|
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|

### 2. 개발 도구

|사용기술 | 설명 | Badge | 
|:---:| :---: |:---: |
| **Visual Studio Code<br>(VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
|**GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Vercel** | **서버리스 플랫폼** |![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX**|![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |

## 🐞 트러블슈팅 (Troubleshooting)

> 개발 중 이슈와 해결 방안

 * ```/movie``` 경로에서 인기작과 평점 높은 작품을 같이 보여주고 싶었으나,<br>
    기존 구조는 ```/movie/popular```, ```/movie/top_rated``` 처럼 하나의 리스트만 보여주는 구조였음

    ⇒ **원인**: 
    * ```/movie``` 경로에 대한 데이터가 존재하지 않았음
    * Card 컴포넌트에서 각 영화가 어떤 분류(popular/top_rated) 인지 알 수 있는 정보가 없었음

    ⇒ **해결방법**: 
    * ```/movie``` 경로일 경우 popular와 top_rated 데이터를 동시에 요청 (Promise.all)
    * 각각의 데이터에 ```.map(item => ({ ...item, type: 'popular' }))``` 식으로 type 값을 명시
    * setList()에 두 데이터를 합쳐서 저장<br>
        → ```pageNum === 1```일 때는 새로 덮고, 아니면 기존 리스트에 추가
    * CardList 컴포넌트에 ```type={[...path, item.type]}``` 전달하여
    * 카드가 본인이 인기작인지 평점작인지 구분 가능하도록 처리


## 💭 느낀점

처음 리액트를 다루다 보니 컴포넌트 나누기, props와 state 관리가 많이 헷갈렸다.<br>
직접 조건 분기와 데이터 흐름을 관리하면서 리액트 구조를 깊이 이해하게 됐다.<br>
덕분에 props와 state의 역할과 쓰임새도 확실히 공부할 수 있었고, SPA 개발에 자신감이 생겼다.
