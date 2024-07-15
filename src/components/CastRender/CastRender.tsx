import { useTypedSelector } from '../../hooks';
import css from './CastRender.module.scss';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { CastType } from '../../types';
import { RootState } from '../../redux/selectors';

interface CastRenderProps {
  selector: (state: RootState) => CastType[];
}

const CastRender: FC<CastRenderProps> = ({ selector }) => {
  const actors = useTypedSelector(selector);
  return (
    <div className={css.mainContainer}>
      {actors.map((actor, index) => (
        <div key={actor.id + index} className={css.container}>
          <div className={css.actorInfo}>
            <Link to={`/actor/${actor.id}`} className={css.link}>
              <p className={css.actor}>
                {actor.name}
                {index < actors.length - 1 ? ',' : '.'}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CastRender;
