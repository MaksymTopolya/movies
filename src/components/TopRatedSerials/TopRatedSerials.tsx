import { FC } from 'react';
import { clearTopRatedSerials } from '../../redux/serialsSlice';
import { useTypedDispatch } from '../../hooks';
import { getTopRatedSerials } from '../../SerialsApi';
import { topRatedSerials, topRatedSerialsPages } from '../../redux/selectors';
import SerialsRender from '../SerialsRender/SerialsRender';

const TopRatedSerials: FC = () => {
  const dispatch = useTypedDispatch();
  const clearPage = () => {
    dispatch(clearTopRatedSerials([]));
  };
  return (
    <div>
      <SerialsRender
        selector={topRatedSerials}
        pages={topRatedSerialsPages}
        onDispatch={getTopRatedSerials}
        clear={clearPage}
      />
    </div>
  );
};

export default TopRatedSerials;
