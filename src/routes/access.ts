import { UserAccess } from '@dracomithril/types';
import * as ROUTES from './routes';

const instructor = [
  ROUTES.A_PRESENTATION,
];

const moderator = [
  ROUTES.A_TESTS,
  ROUTES.A_QUESTIONS_SHOW,
  ROUTES.A_COPY_QUESTIONS,
];

const admin = [
  ROUTES.A_USERS,
  ROUTES.A_SHOW_TOKENS,
  ROUTES.A_BACKUP,
];

function verifyAccess(route: string, schema: string[]) {
  return schema.includes(route) || route === ROUTES.ADMIN_PANEL;
}

function verifyUserClaims(route: string, access?: UserAccess): boolean {
  switch (access) {
    case UserAccess.INSTRUCTOR:
      return verifyAccess(route, instructor);
    case UserAccess.MODERATOR:
      return verifyAccess(route, [...instructor, ...moderator]);
    case UserAccess.ADMIN:
      return verifyAccess(route, [...instructor, ...moderator, ...admin]);
    default:
      return false;
  }
}

export default verifyUserClaims;

type MenuInfoType ={
  id: string,
  translationPath: string
}
export const menuMappings = new Map<string, MenuInfoType>([
  [ROUTES.HOME, { id: 'home', translationPath: 'menu.home' }],
  [ROUTES.POLICY_COOKIE, { id: 'cookies_policy', translationPath: 'menu.cookies_policy' }],
  [ROUTES.A_PRESENTATION, { id: 'presentation', translationPath: 'menu.presentation' }],
  [ROUTES.A_TESTS, { id: 'showTests', translationPath: 'menu.showTests' }],
  [ROUTES.A_TEST_FORM, { id: 'addTest', translationPath: 'menu.addTest' }],
  [ROUTES.A_QUESTION_FORM, { id: 'addQuestion', translationPath: 'menu.addQuestion' }],
  [ROUTES.A_COPY_QUESTIONS, { id: 'copyQuestion', translationPath: 'menu.copyQuestion' }],
  [ROUTES.A_QUESTIONS_SHOW, { id: 'showQuestion', translationPath: 'menu.showQuestion' }],
  [ROUTES.A_USERS, { id: 'users', translationPath: 'menu.users' }],
  [ROUTES.A_TOKEN_FORM, { id: 'addTokens', translationPath: 'menu.addTokens' }],
  [ROUTES.A_SHOW_TOKENS, { id: 'showTokens', translationPath: 'menu.showTokens' }],
  [ROUTES.A_BACKUP, { id: 'backup', translationPath: 'menu.backup' }],
]);

export function getLinks(access?: UserAccess): {[name: string]:string[]} {
  switch (access) {
    case UserAccess.INSTRUCTOR:
      return {
        instructor,
      };
    case UserAccess.MODERATOR:
      return {
        instructor,
        moderator,
      };
    case UserAccess.ADMIN:
      return {
        instructor,
        moderator,
        admin,
      };
    case UserAccess.USER:
    default:
      return {};
  }
}
