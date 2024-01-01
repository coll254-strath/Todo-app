import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  Checkbox,
  TabPanels,
  TabPanel,
  IconButton,

} from '@chakra-ui/react'
import { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'

const App = () => {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = e => {
    e.preventDefault()

    if (newTask.length > 0) {
      setTasks(prevState => [
        ...prevState,
        { text: newTask, newTask, isChecked: false }
      ])
      setNewTask('')
    }
  }

  const udpateTask = (index, checked) => {
    let newTasks = [...tasks]
    newTasks[index].isChecked = checked
    setTasks(newTasks)
  }

  const removeTask = index => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }
  return (
    <>
      <Flex w='75%' h='90vh'>
        <Flex w='100%' flexDir='column' ml='18%' mt='4.5%' mr='18%' color='white'>
          <Text fontWeight='650' fontSize={30}>Task Manager</Text>
          <form onSubmit={addTask}>
            <Flex mt='2%'>
              <Input value={newTask} onChange={e => setNewTask(e.target.value)} variant='flushed' placeholder='Add task' w='50%' />
              <Button onClick={addTask} ml={5} bg='green.400'>Add Task</Button>
         
            </Flex>
          </form>
          <Tabs mt='4%' w='80%'>
            <TabList>
              <Tab>Incomplete Tasks</Tab>
              <Tab>Completed Tasks</Tab>
              <Tab>In progress</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {tasks.map((task, index) => (
                  !task.isChecked ? <TaskItem removeTask={removeTask} udpateTask={udpateTask} key={index} task={task} index={index} /> : null
                ))}
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) => (
                  task.isChecked ? <TaskItem removeTask={removeTask} udpateTask={udpateTask} key={index} task={task} index={index} /> : null
                ))}
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) => (
                  !task.isChecked ? <TaskItem removeTask={removeTask} udpateTask={udpateTask} key={index} task={task} index={index} /> : null
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  )
}

const TaskItem = ({ task, index, udpateTask, removeTask }) => {
  return (
    <Checkbox onChange={e => udpateTask(index, e.target.checked)} colorScheme='green' mb={10} w='100%' flexDir='row' isChecked={task.isChecked}>
      <Flex w='100%' flexDir='row'>
        <Text color='white' alignSelf='center'>{task.text}</Text>
        <IconButton onClick={() => removeTask(index)} bg='red.600' pos='absolute' right={0} icon={<DeleteIcon />} />
      </Flex>
    </Checkbox>
  )
}

export default App