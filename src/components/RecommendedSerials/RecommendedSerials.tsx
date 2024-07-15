import { getRecommendedSerials } from '../../SerialsApi';
import {
  recommendedSerials,
  recommendedSerialsPages,
} from '../../redux/selectors';
import { useTypedDispatch } from '../../hooks';

import { clearRecommendedSerials } from '../../redux/serialsSlice';
import { FC } from 'react';

import SerialsRender from '../SerialsRender/SerialsRender';

export const RecommendedSerials: FC = () => {
  const dispatch = useTypedDispatch();
  const clearPage = () => {
    dispatch(clearRecommendedSerials([]));
  };
  return (
    <div>
      <SerialsRender
        selector={recommendedSerials}
        pages={recommendedSerialsPages}
        onDispatch={getRecommendedSerials}
        clear={clearPage}
      />
    </div>
  );
};

export default RecommendedSerials;
