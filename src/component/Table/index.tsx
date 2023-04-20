const Table: React.FC<{}> = () => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Company</th>
          <th>City</th>
          <th>Progress</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>heelo</td>
        </tr>
        {/* {clientsPaginated.map((client: Client) => (
            <tr key={client.id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar username={client.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
              </td>
              <td data-label="Name">{client.name}</td>
              <td data-label="Company">{client.company}</td>
              <td data-label="City">{client.city}</td>
              <td data-label="Progress" className="lg:w-32">
                <progress
                  className="flex w-2/5 self-center lg:w-full"
                  max="100"
                  value={client.progress}
                >
                  {client.progress}
                </progress>
              </td>
              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <small className="text-gray-500 dark:text-slate-400">{client.created}</small>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => setIsModalTrashActive(true)}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
          ))} */}
      </tbody>
    </table>
  );
};

export default Table;
