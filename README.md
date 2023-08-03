# Straight-BlueWave

## 팀원 소개

<table>
  <tr>
    
<td align="center"><a href="https://github.com/bys096"><img src="https://avatars.githubusercontent.com/u/82657858?v=4"
 width="100px;" alt=""/><br /><sub><b>반영서</b></sub></a><br /><a href="https://github.com/bys096" title="Code">🏠</a></td>
    
 <td align="center"><a href="https://github.com/tkdrms4585"><img src="https://avatars.githubusercontent.com/u/76689529?v=4"
 width="100px;" alt=""/><br /><sub><b>왕인성</b></sub></a><br /><a href="https://github.com/tkdrms4585" title="Code">🏠</a></td>

 <td align="center"><a href="https://github.com/mkyoung24"><img src="https://avatars.githubusercontent.com/u/103173521?v=4"
 width="100px;" alt=""/><br /><sub><b>문기용</b></sub></a><br /><a href="https://github.com/mkyoung24" title="Code">🏠</a></td>

 <td align="center"><a href="https://github.com/nettiger0"><img src="https://avatars.githubusercontent.com/u/103232843?v=4"
 width="100px;" alt="https://github.com/nettiger0"/><br /><sub><b>민경민</b></sub></a><br /><a href="" title="Code">🏠</a></td>

 <td align="center"><a href="https://github.com/monya-9"><img src="https://avatars.githubusercontent.com/u/64175828?v=4"
 width="100px;" alt=""/><br /><sub><b>조현주</b></sub></a><br /><a href="https://github.com/monya-9" title="Code">🏠</a></td>

 <td align="center"><a href="https://github.com/Sungbin00"><img src="https://avatars.githubusercontent.com/u/103156250?v=4"
 width="100px;" alt=""/><br /><sub><b>서성빈</b></sub></a><br /><a href="https://github.com/Sungbin00" title="Code">🏠</a></td>

</tr>
    
</table>
<br>

## 목차
[1. 프로젝트 소개](#프로젝트-소개)


## 프로젝트 소개
효율적인 회의 진행 및 관리를 위한해 실시간 화상회의 및 회의록 자동생성과 요약을 지원하는 서비스

<br>



## 버전
blue wave ver 0.0.1

## 설치 및 실행방법
1. git clone
2. 각 서버 npm i (node 서버 동작 오류 시 babel 추가
```
npm i @babel/node -g
```
3. 노드 서버 기동
```
 npm run dev
```
4. localtunnel 기동(node port번호 4000을 따라감)
```
npx localtunnel --port 4000
```
5. 발급 받은 URL로 build 폴더의 socket.io에 관한 script 태그 수정
6. URL로 접속
