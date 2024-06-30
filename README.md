<h1>📌 Intro</h1><br>

이 프로젝트는 리액트로 진행한 팀 세미 프로젝트입니다.<br><br>

총 4명이 참여했으며, 초기에는 5명이었지만 프로젝트 시작 후 한 명이 그만두어 최종적으로 4명이 프로젝트를 완료했습니다.<br><br>

사용 API는 Tmdb, NaverLogin, KakaoLogin, disqus 입니다 <br><br>

Tmdb에서 제공하는 데이터가 정말 잘 만들어져 있어, 이미지와 텍스트 등 여러 부분에서 큰 도움을 받았습니다. <br><br>

가이드라인도 잘 정리되어 있으니, 한 번 [방문](https://developer.themoviedb.org/reference/intro/getting-started)해 보시기를 추천합니다.<br><br>

다음은 프로젝트 파일 구조입니다 : <br><br>
![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/b5bb3020-1735-4993-8df4-b5c28c91ca1b)

구현 작업을 효율적으로 분담하기 위해 초기에 파일 구조를 정의하고, 각 컴포넌트별로 역할을 나누었습니다. <br>

>1. 메인페이지 슬라이더 구현 **PM 이재민**
>2. 메인페이지 컨텐츠 구현 **이종혁**
>3. 서브페이지 구현 **이현아**
>4. 로그인 페이지 및 네비게이션 푸터 구현 **엄장원**


GitHub 브랜치를 나누어 체크포인트로 사용하고, 이후 PM이 merge하여 메인 컴포넌트에 병합하는 방식으로 작업을 진행했습니다. <br><br>

각자 맡은 부분을 완료한 후에는 다른 팀원의 작업을 도와주는 형식으로 협력했습니다. <br><br>

전역 CSS로 인한 스타일 충돌을 방지하기 위해 CSS 모듈을 적용하여 개별 CSS로 구현했습니다. <br><br>

<h3>필요 nodejs 라이브러리</h3>

> npm install @fortawesome/free-brands-svg-icons <br>
> npm install @fortawesome/free-solid-svg-icons <br>
> npm install @fortawesome/react-fontawesome <br>
> npm install @reduxjs/toolkit <br>
> npm install @testing-library/jest-dom <br>
> npm install @testing-library/react <br>
> npm install @testing-library/user-event <br>
> npm install axios <br>
> npm install core-js <br>
> npm install crypto-browserify <br>
> npm install disqus-react <br>
> npm install gsap <br>
> npm install jwt-simple <br>
> npm install react <br>
> npm install react-dom <br>
> npm install react-redux <br>
> npm install react-router-dom <br>
> npm install react-scripts <br>
> npm install react-scroll <br>
> npm install react-slick <br>
> npm install react-transition-group <br>
> npm install redux-persist <br>
> npm install regenerator-runtime <br>
> npm install slick <br>
> npm install slick-carousel <br>
> npm install web-vitals <br>

```bash
npm install
```

<h1>📌 Implementation</h1><br>

초기 프로토타입은 피그마로 작성하였습니다
<div align="center">
    [![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/9ae75eba-80ca-44bd-8254-435d777f7879)](https://www.figma.com/design/LiW2vmTgXMoNPB5FbTt5fq/4team?node-id=0-1&t=xPf6tY7ovEIzjCXR-1)
    <p>클릭 시 피그마로 이동합니다</p>
</div>
이 후 로직은 구현하면서 조금씩 수정하였습니다

<h3>메인페이지</h3>

메인페이지는 useTmdbDataPull 컴포넌트로 ajax API 호출하여 필요 데이터를 가져오는 비즈니스 로직을 따로 분리하여 유지보수에 용이하도록 만들었습니다 <br>
슬라이더 섹션을 포함한 메인페이지의 컨텐츠에 필요한 데이터는 해당 컴포넌트에서 가져옵니다 <br>

```javascript
fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&include_adult=false', options),
fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${today}`, options),
fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options),
fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR', options)
```

슬라이더 구현 부분입니다<br>

<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/b10aa919-b773-4a7d-9037-c1269c3461ec" alt="메인 헤더" width="700"/>
  <p>메인 슬라이더</p>
</div>

React-slick 라이브러리를 사용하여 슬라이더를 구현했습니다 setting 변수로 편하게 구현할 수 있었습니다<br><br>

타이핑 애니메이션 구현은 위에서 말한 useTmdbDataPull 컴포넌트에서 데이터를 받으면 우선 전체 글을 hidden 시키고 하나씩 보이도록 하여 타이핑 하는 효과를 냈습니다 <br><br>

메인페이지 컨텐츠 부분입니다 <br><br>

<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/ab64af11-9d9b-438a-be9c-2bc9f5290223" alt="메인 헤더" width="700"/>
  <p>인기영화 Section</p>
</div>



전체적인 메인페이지 컨텐츠 부분은 flex를 사용하여 구현했고 반응형으로 디바이스 해상도에 맞춰서 컨텐츠 부분이 이동하도록 wrap을 적극 활용하였습니다 <br><br>

메인페이지에서 클릭 한 이미지는 영화 id로 session 저장하여 서브페이지로 보냅니다 <br><br>

서브페이지에서 영화 id를 받아서 다시 ajax로 필요한 데이터들을 띄워줍니다 <br><br>

```javascript
<Route path="/subpage/:movieId" element={<SubPage />} />
```

<h3>서브페이지</h3>
<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/97bc2317-fff1-428b-b53c-e3c2e4897551" alt="메인 헤더" width="700"/>
  <p>서브페이지</p>
</div>

메인페이지에서 vh로 화면 꽉차게 슬라이더를 구현했습니다 이후 서브페이지 header를 메인페이지처럼 화면 꽉차게 구현해버리면 <br><br>

현재 페이지의 구분이 애매해질거라 판단해서 서브페이지의 header 이미지는 메인페이지보다 작게 구현했습니다 <br><br>

메인페이지의 이미지와는 다른 이미지를 사용하기 위해 배열에서 1번에 있는 이미지를 사용했습니다 <br><br>

메인페이지와 마찬가지로 영화 디테일 설명과 캐스팅 배우들을 표시 해주는 섹션을 flex로 만들었고 반응형으로 다양한 디바이스 해상도에 가변적으로 대응했습니다 <br><br>

데이터 호출 또한 메인페이지의 방식을 준용해 데이터풀러를 이용했으며, 다만 관리 및 유지 보수의 용이성을 위해 <br>
헤더 이미지, 영화 상세 정보, 출연진 정보 각각의 출력 컴포넌트와 데이터풀러를 별도로 생성했습니다 <br><br>

티저 영상의 경우 버튼 클릭 시 팝업 형태로 열리는 iframe 기반 비디오 뷰어 컴포넌트를 활용해 출력하도록 했습니다. <br><br>

사용자 편의성을 위해 X버튼 이외에도 팝업 영역을 제외한 화면 어디를 누르더라도 팝업을 닫을 수 있도록 설정했습니다. <br><br>

<h3>리뷰</h3>
<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/4e842618-8d5d-4ba4-82d7-7c06a8b80934" alt="메인 헤더" width="700"/>
  <p>리뷰</p>
</div>

disqus가 여러 부분에서 잡다한 게 많아서 remark42 로 이 문제를 해결해보려고 하였습니다 <br><br>

remark42는 docker 컨테이너로 개별적인 댓글 기능을 구현할 수 있도록 하는 솔루션입니다 <br><br>

![KakaoTalk_20240608_151537320](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/49382177-665b-4e3b-adda-2680f4171d48) <br>

위에 보이는것처럼 disqus보다는 깔끔하게 나옵니다 그리고 익명 사용자에 대한 작성을 활성화 시켰는데 403 문제가 발생했습니다 <br><br>

권한 문제로 보이는것 같아 PM의 개인서버에서 도커로 바로 가져오는 것이 아닌 ubuntu를 설치하여 docker in docker 로 진행해 봤으나 여전히 같은 문제가 발생하여 <br>
disqus로 댓글창을 구현해서 리뷰 형식으로 쓸 수 있도록 구현했습니다 <br><br>

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/f464a691-3c8a-4147-9f2a-6400dd6da517)


disqus는 iframe 형태로 가져오는 것이지만 config로 따로 필더링 할 수 있는 기술이 있어서 그 기능을 활용했습니다 <br><br>

데이터 저장과 불러오는 것은 현재 url 데이터에 맞춰서 불러오도록 했습니다 <br>
```javascript
const DisqusComments = ({ url, identifier }) => {
  useEffect(() => {
    var disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://semi-project-4team.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, [url, identifier]);
```

<h3>네비게이션</h3>
<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/def6b86d-16ef-425f-ba10-2ba88dcaee4d" alt="메인 헤더" width="400"/>
  <p>네비게이션</p>
</div>

네비게이션의 경우 오른쪽 상단에 전체 메뉴를 볼 수 있는 기능과 클릭하면 해당하는 section으로 이동하는 기능으로 만들었습니다 <br><br>

메인페이지와 서브페이지의 경우 header section 부터 네비게이션의 background-color 를 활성화 시키면 처음 보이는 이미지의 웅장함으로 오는 기대감을 해칠 것 같아 <br>
header를 넘어가면 background-color 를 활성화 시키도록 구현했습니다 <br><br>

클릭하면 이동하는 네비게이션 구현은 해당 컴포넌트를 사용하는 Page에서 sction에 id와 name을 만들고 클릭하면 해당하는 id가 있는 section 으로 이동하도록 구현했습니다 <br><br>

setion이랑 id가 없는 경우 로고와 전체 메뉴만 flex로 띄워지도록 만들었습니다 <br><br>

모바일의 경우 클릭 시 이동하는 메뉴가 많아지면 font-size를 엄청 작게 만들어야 하는 이유도 있고 <br>
조잡해 보일 것 같아 어느정도의 해상도를 넘어가면 클릭 시 이동하는 네비게이션은 display:none 했습니다 <br><br>

<h3>마이페이지, 박스오피스</h3>
<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/39fed2af-fb6b-4f12-8a01-a5cf5b6e02ca" alt="메인 헤더" width="700"/>
  <p>마이페이지</p>
</div>
서브페이지는 메인페이지에서 session에 movieId를 받고 이동하는 페이지이기 때문에 서브페이지로 직접 이동하는 메뉴는 구현하지 않고 로그인 페이지와 메인페이지로 이동하는 버튼만 구현했습니다.<br><br>

대신 search box를 이곳에 배치하여, 사용자가 찾는 특정 영화의 서브페이지와의 연결을 제공함으로써 사이트의 목적에 부합하는 기본 기능을 보강했습니다. <br><br>

searchBox의 경우 검색 할 때 입력한 movieTitle의 일치하는 영화 3개까지만 가져와 간단한 리스트 형식으로 출력하며 <br>
검색어 입력값 상태가 바뀔 때 마다 그리고 검색어 입력값이 없을 때 모두 예외처리 하여 구현했습니다 <br><br>

한국 박스오피스 10위에 포함된 영화가 검색되면, 서브페이지의 영화 제목 오른쪽 부분에 타이핑 애니메이션과 함께 링크가 생성됩니다 <br><br>

해당 링크를 클릭하면 한국 박스오피스 내용을 출력합니다 <br><br>

<h3>로그인 페이지</h3>

<div align="center">
  <img src="https://github.com/kh-Semi-project-4team/Movie/assets/129711481/11c8498c-eb95-4ac9-a6f6-64ddc67735d8" alt="메인 헤더" width="700"/>
  <p>로그인</p>
</div>

기본적으로 만든 로그인 페이지는 node js express 서버로 백엔드를 구현한 것이며 강사님이 제공해주셨습니다 <br><br>

kakaoLogin과 NaverLogin은 API를 가져와서 ajax로 호출 입력한 데이터에 맞춰서 로그인 데이터를 받아 session으로 네비게이션 컴포넌트에 전달 <br>
이 후 로그인을 로그아웃을 바꾸고 모바일의 경우 닉네임을 표시하도록 구현했습니다 <br><br>

로그인 페이지의 경우 메뉴를 심플하게 구현했고, 자바스크립트로 애니메이션을 구현했습니다 <br><br>


<h1>📌 Deploy </h1><br>

PM의 시놀로지 나스 서버를 사용하여 Github에 push 작업이 올라오면 자동으로 webHook 하여 빌드 테스트 및 여러 테스트 합니다 <br><br>

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/9d3d2d41-2679-4f74-b1f3-ad18f60885cf)

보이는것 처럼 정상적으로 완료되면 빌드 파일이 생성됩니다 

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/4b6d4f97-de7b-44a9-a41b-2df368702725)

이 빌드 파일을 엔진엑스에 업로드 하여 엔진엑스를 웹 서버로 리액트 프로젝트를 배포 했습니다 <br><br>

전체적인 데이터 흐름입니다

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/3c2b990b-d32b-4e22-9385-2a331afef59e)

이후 가비아로 도매인을 구매하여 DNS 호스팅 까지 맞췄습니다 <br>
(서버의 주소와 포트번호가 노출되면 보안에 취약함으로 Github public을 위해 만들었습니다) <br><br>

접속은 아래 링크로 하실 수 있습니다 <br><br>

http://movie4team.site/

























