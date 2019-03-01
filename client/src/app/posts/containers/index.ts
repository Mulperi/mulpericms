import { AllComponent } from './all/all.component';
import { PostComponent } from './post/post.component';
import { PostsFeatureComponent } from './posts-feature/posts-feature.component';
import { CommentComponent } from '../components/comment/comment.component';
export const containers = [
  AllComponent,
  PostComponent,
  PostsFeatureComponent,
  CommentComponent
];
export * from './all/all.component';
export * from './post/post.component';
export * from './posts-feature/posts-feature.component';
export * from '../components/comment/comment.component';
