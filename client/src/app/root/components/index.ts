import { OwnPostListComponent } from './own-postlist/own-postlist.component';
import { SignUpFormComponent } from './signup-form/signup-form.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { OwnCommentListComponent } from './own-commentlist/own-commentlist.component';

export const components = [
  SignUpFormComponent,
  OwnPostListComponent,
  OwnCommentListComponent,
  PersonalDetailsComponent
];
export const entryComponents = [OwnPostListComponent, PersonalDetailsComponent];

export * from './signup-form/signup-form.component';
export * from './own-postlist/own-postlist.component';
export * from './own-commentlist/own-commentlist.component';
export * from './personal-details/personal-details.component';
