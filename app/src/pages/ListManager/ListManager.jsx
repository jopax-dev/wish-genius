import { PageLoader } from '../../components/PageLoader'
import { ChooseList } from './components/ChooseList'
import { CreateListForm } from './components/CreateListForm'

export const ListManager = () => {
  return (
    <>
      <PageLoader />
      <CreateListForm />
      <ChooseList />
    </>
  )
}
