# SEOUL COLLECTIVE CLIENT

## 실행

```bash
npm run dev
```

<br>

## Tech Stack

| 역할                 | 종류                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Core                 | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)                                |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                      |
| Styling              | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white) |
| Data Fetching        | ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)                                                                                                                |
| Headless CMS         | ![contentful](https://img.shields.io/badge/contentful-2478CC?style=for-the-badge&logo=contentful&logoColor=white)                                                                                                                          |
| Package Manager      | ![pnpm](https://img.shields.io/badge/npm-F69220?style=for-the-badge&logo=npm&logoColor=white)                                                                                                                                            |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                           |

<br/>

## 프로젝트 컨벤션 & 협업 가이드

### 브랜치 전략

**Git Flow**

- `main` - 배포 가능한 상태만을 관리합니다
- `dev` - 통합 브랜치 역할을 하며, 평소에는 해당 브랜치를 기반으로 개발을 진행합니다.

**브랜치 네이밍 컨벤션**

| 유형      | 형식                            | 예시                        |
| --------- | ------------------------------- | --------------------------- |
| 기능 추가 | `feature/<기능명>/#<이슈번호>`  | `feature/signin-signup/#12` |
| 버그 수정 | `fix/<기능명>/#<이슈번호>`      | `fix/login-redirect/#27`    |
| 리팩토링  | `refactor/<기능명>/#<이슈번호>` | `refactor/api-route/#34`    |
| 긴급 패치 | `hotfix/<기능명>//#<이슈번호>`  | `hotfix/fix-navbar/#77`     |

- 기능명에는 **kebab-case** 사용
- 이슈 번호는 GitHub 이슈와 연동

<br>

---

<br>

### 커밋 컨벤션

[Udacity Git Style Guide](https://udacity.github.io/git-styleguide/) 기반

| 태그 이름 | 설명                                                                 |
| --------- | -------------------------------------------------------------------- |
| feat      | 새로운 기능 구현                                                     |
| fix       | 버그, 오류 수정                                                      |
| hotfix    | issue나 QA에서 급한 버그 수정                                        |
| docs      | 문서 수정                                                            |
| test      | 테스트 코드 추가 및 업데이트                                         |
| chore     | 코드 수정, 내부 파일 수정                                            |
| style     | UI, 스타일 수정                                                      |
| del       | 불필요한 코드 삭제                                                   |
| refactor  | 기능은 바꾸지 않되, 코드의 구조를 변경                               |
| merge     | 다른 브랜치를 merge 할 때 사용                                       |
| add       | feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시 |
| rename    | 파일 이름 변경                                                       |
| move      | 프로젝트 내 파일이나 코드의 이동                                     |
| remove    | 파일 삭제                                                            |

```bash
feat: 마이페이지 UI 구현
fix: 로그인 시 토큰 누락 오류 수정
refactor: userService 코드 정리
style: 버튼 hover 효과 추가
docs: README에 브랜치 전략 설명 추가
hotfix: 배포 후 500 에러 응급 조치
```
