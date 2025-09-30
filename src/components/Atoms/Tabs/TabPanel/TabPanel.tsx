import type { TabPanelProps } from './TabPanelProps';

/**
 * TabPanel component renders the content of the currently selected tab.
 * It uses the `aria-labelledby` and `role` attributes for accessibility.
 * The `hidden` attribute is used to hide the content of the tab panel when it is not selected.
 * 
 * @param currentTabIndex - The index of the currently selected tab.
 * @param tabIndex - The index of the tab for which the panel is being rendered.
 * @param children - The content to be displayed within the tab panel.
 * 
 * @returns TabPanel component.
 */
export const TabPanel = ({
  currentTabIndex,
  tabIndex,
  children,
}: TabPanelProps) => {
  return (
    <div
      aria-labelledby={`tabpanel-${tabIndex}`}
      hidden={currentTabIndex !== tabIndex}
      id={`tabpanel-${tabIndex}`}
      role='tabpanel'
      style={{
        width: '100%', 
      }}
    >
      {currentTabIndex === tabIndex && <> {children} </>}
    </div>
  );
};
