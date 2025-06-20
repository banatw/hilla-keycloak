import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
  menu: { order: 0, icon: 'line-awesome/svg/file.svg' },
  title: 'Empty',
  rolesAllowed: ['USER'],
};

export default function EmptyView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      {/* <img style={{ width: '200px' }} src="images/empty-plant.png" /> */}
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
    </div>
  );
}
