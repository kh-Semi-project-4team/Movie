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

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/9ae75eba-80ca-44bd-8254-435d777f7879)

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
React-slick 라이브러리를 사용하여 슬라이더를 구현했습니다 setting 변수로 편하게 구현할 수 있었습니다<br><br>

타이핑 애니메이션 구현은 위에서 말한 useTmdbDataPull 컴포넌트에서 데이터를 받으면 우선 전체 글을 hidden 시키고 하나씩 보이도록 하여 타이핑 하는 효과를 냈습니다 <br><br>

메인페이지 컨텐츠 부분입니다 <br><br>

전체적인 메인페이지 컨텐츠 부분은 flex를 사용하여 구현했고 반응형으로 디바이스 해상도에 맞춰서 컨텐츠 부분이 이동하도록 wrap을 적극 활용하였습니다 <br><br>

메인페이지에서 클릭 한 이미지는 영화 id로 session 저장하여 서브페이지로 보냅니다 <br><br>

서브페이지에서 영화 id를 받아서 다시 ajax로 필요한 데이터들을 띄워줍니다 <br><br>

```javascript
<Route path="/subpage/:movieId" element={<SubPage />} />
```

<h3>서브페이지</h3>

메인페이지에서 vh로 화면 꽉차게 슬라이더를 구현했습니다 이후 서브페이지 header를 메인페이지처럼 화면 꽉차게 구현해버리면 <br><br>

현재 페이지의 구분이 애매해질거라 판단해서 서브페이지의 header 이미지는 메인페이지보다 작게 구현했습니다 <br><br>

배열에서 메인페이지의 이미지랑 다른 이미지를 사용하기 위해 1번 배열에 있는 이미지를 사용했습니다 <br><br>

메인페이지와 마찬가지로 영화 디테일 설명과 캐스팅 배우들을 표시 해주는 섹션을 flex로 만들었고 반응형으로 디바이스 해상도에 다 대응 했습니다 <br><br>

댓글 부분입니다 disqus가 여러 부분에서 잡다한게 많아서 remark42 로 이 문제를 해결해보려고 하였습니다 <br><br>

remark42는 docker 컨테이너로 개별적인 댓글 기능을 구현할 수 있도록 하는 솔루션입니다 <br><br>

![KakaoTalk_20240608_151537320](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/49382177-665b-4e3b-adda-2680f4171d48) <br>

현재 보이는것처럼 disqus보다는 깔끔하게 나옵니다 그리고 익명 사용자에 대한 작성을 활성화 시켰는데 403 문제가 발생했습니다 <br><br>

권한 문제로 보이는것 같아 PM의 개인서버에서 도커로 바로 가져오는 것이 아닌 ubuntu를 설치하여 docker in docker 로 진행해 봤으나 여전히 같은 문제가 발생하여 <br>
disqus로 댓글창을 구현해서 리뷰 형식으로 쓸 수 있도록 구현했습니다 <br><br>

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/f464a691-3c8a-4147-9f2a-6400dd6da517)


disqus는 ifream 형태로 가져오는 것이지만 config로 따로 필더링 할 수 있는 기술이 있어서 그 기능을 활용했습니다 <br><br>

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

네비게이션의 경우 오른쪽 상단에 전체 메뉴를 볼 수 있는 기능과 클릭하면 해당하는 section으로 이동하는 기능으로 만들었습니다 <br><br>

메인페이지와 서브페이지의 경우 header section 부터 네비게이션의 background-color 를 활성화 시키면 처음 보이는 이미지의 웅장함으로 오는 기대감을 해칠 것 같아 <br>
header를 넘어가면 background-color 를 활성화 시키도록 구현했습니다 <br><br>

클릭하면 이동하는 네비게이션 구현은 해당 컴포넌트를 사용하는 Page에서 sction에 id와 name을 만들고 클릭하면 해당하는 id가 있는 section 으로 이동하도록 구현했습니다 <br><br>

setion이랑 id가 없는 경우 로고와 전체 메뉴만 flex로 띄워지도록 만들었습니다 <br><br>

모바일의 경우 클릭 시 이동하는 메뉴가 많아지면 font-size를 엄청 작게 만들어야 하는 이유도 있고 <br>
조잡해 보일 것 같아 어느정도의 해상도를 넘어가면 클릭 시 이동하는 네비게이션은 display:none 했습니다 <br><br>

마이페이지의 메뉴입니다 <br><br>

서브페이지는 메인페이지에서 session에 movieId를 받고 이동하는 페이지라 다이렉션으로 이동하는 메뉴는 구현하지 않았습니다 <br><br>

로그인 페이지와 메인페이지로 이동하는 버튼만 구현했습니다 그리고 search box를 이곳에 구현하여 빈 공백에서 오는 부족함을 해결했습니다 <br><br>

searchBox의 경우 검색 할 때 입력한 movieTitle의 일치하는 영화 3개까지만 가져오며 <br>
검색어 입력값 상태가 바뀔 때 마다 그리고 검색어 입력값이 없을 때 모두 예외처리 하여 구현했습니다 <br><br>

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/6e25f244-f7a2-4a99-808e-32e1ed1904e8)

<h3>로그인 페이지</h3>

기본적으로 만든 로그인 페이지는 node js express 서버로 백엔드를 구현한 것이며 강사님이 제공해주셨습니다 <br><br>

kakaoLogin과 NaverLogin은 API를 가져와서 ajax로 호출 입력한 데이터에 맞춰서 로그인 데이터를 받아 session으로 네비게이션 컴포넌트에 전달 <br>
이 후 로그인을 로그아웃을 바꾸고 모바일의 경우 닉네임을 표시하도록 구현했습니다 <br><br>

![image](https://github.com/kh-Semi-project-4team/Movie/assets/129711481/fba5ae88-698a-46df-b95f-26a7bb6bbfab)

로그인 페이지의 경우 메뉴를 심플하게 구현했고 자바스크립트로 애니메이션도 많이 넣었습니다 <br><br>


<h1>📌 deploy </h1><br>

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

























