// data/mockTasks.ts
import { Task } from '../types/Task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Daily Meeting',
    time: '9:00 am - 10:30 am',
    location: 'Zoom Link: xxx.zoom.us',
    completed: true,
    color: '#8ca9ff',
  },
  {
    id: '2',
    title: 'Lunch Break',
    time: '9:00 am - 10:30 am',
    location: '',
    completed: true,
    color: '#4c9fd4',
  },
  {
    id: '3',
    title: 'Interview with 1 Thing',
    time: '2:00 pm - 3:30 pm',
    location: '360 Huntington Ave, Room 101',
    completed: true,
    color: '#b08bda',
  },
  {
    id: '4',
    title: 'Pick Up my Dog',
    time: '6:00 pm',
    location: 'Hellow World Vet',
    completed: true,
    color: '#8ca9ff',
  },
  {
    id: '5',
    title: 'Party',
    time: '9:00 pm',
    location: "Momo's House",
    completed: true,
    color: '#4c9fd4',
  },
];
