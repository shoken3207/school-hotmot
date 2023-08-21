import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Dispatch, SetStateAction } from 'react';

const CommonTab = ({
  tabs,
  selectTab,
  setSelectTab,
}: {
  tabs: { id: number; name: string }[];
  selectTab: number;
  setSelectTab: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Box sx={{ maxWidth: { xs: 380, sm: 680 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={selectTab}
        onChange={(e, value) => setSelectTab(value)}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
      >
        {tabs.map((tab: { id: number; name: string }, index) => (
          <Tab value={tab.id} key={tab.id} label={tab.name} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CommonTab;
