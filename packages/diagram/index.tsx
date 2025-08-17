// This component has been copied from the old project
// We set its typing and logic
//TODO: its tsx needs to be refactored

import useTranslation from 'next-translate/useTranslation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TRecord, TProps } from './type';

export const Diagram = ({
  data = [],
  firstTitle = 'This week',
  secondTitle = 'For this week',
}: TProps) => {
  const { t, lang } = useTranslation('common');

  //?? I can't see this variable on the screen, so I assume it's not used
  const numberOfAnswers =
    lang === 'en' ? 'Number of answers' : 'عدد الإستجابات';

  const getTotalRecords: (records: TRecord[]) => number = records => {
    if (records.length === 0) return 0;

    const numberOfAnswers: number = records
      .map(record => record.numberOfAnswers) //TODO:Remove this line
      .reduce((a, b) => a + b);

    return numberOfAnswers;
  };

  return (
    <div className='w-full space-y-12 relative mt-4 overflow-x-hidden'>
      <div className='flex justify-between items-center flex-col md:flex-row gap-2'>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col gap-3'>
            <span>{firstTitle}</span>
          </div>
          <span className='text-4xl'>{getTotalRecords(data)}</span>
          <div className='flex flex-col gap-3'>
            <span className='text-dark-100 text-xs'>
              {t('common:orders.table.diagram.totalAnswers')}
            </span>
          </div>
          <span className='bg-primary-600 px-3 py-1 mt-2 text-white text-[10px] cursor-default'>
            {secondTitle}
          </span>
        </div>

        <div
          className='w-9/12 2xl:w-10/12 h-[200px] mr-5'
          style={{
            direction: 'rtl',
          }}
        >
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <BarChart
              width={500}
              height={300}
              style={{ direction: 'ltr' }}
              data={data}
              margin={{
                top: 5,
                right: 1,
                left: -45,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={numberOfAnswers}
                barSize={11}
                fill='#801E41'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
