import { FC } from 'react';
import ActorDetailsRender from '../../components/ActorDetailsRender/ActorDetailsRender';
import css from './ActorPage.module.scss';
const ActorPage: FC = () => {
  return (
    <div className={css.container}>
      <ActorDetailsRender />
    </div>
  );
};

export default ActorPage;
