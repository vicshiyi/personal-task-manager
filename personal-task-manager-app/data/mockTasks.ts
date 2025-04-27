// This file provides mock task data for development and testing purposes.
// Tasks include title, time, location, color, status, date, and content fields.
// Useful for initial rendering and feature testing without requiring backend integration.

import { Task } from '../types/Task';

// Get today's date
const today = new Date();

/**
 * Create a new date offset by a given number of days.
 * @param base - The base date
 * @param days - Number of days to add (positive) or subtract (negative)
 * @returns New Date object
 */
const addDays = (base: Date, days: number) => {
  const copy = new Date(base);
  copy.setDate(base.getDate() + days);
  return copy;
};

// Mock task list
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Daily Meeting',
    time: '9:00 am',
    location: 'Zoom Link: xxx.zoom.us',
    color: '#8ca9ff',
    status: 'pending',
    date: today,
    content: 'Daily stand-up meeting with the project team to discuss updates and blockers.',
  },
  {
    id: '2',
    title: 'Lunch Break',
    time: '12:00 pm',
    location: '',
    color: '#4c9fd4',
    status: 'pending',
    date: today,
    content: 'Relax and recharge during lunch break.',
  },
  {
    id: '3',
    title: 'Interview with 1 Thing',
    time: '2:00 pm',
    location: '360 Huntington Ave, Room 101',
    color: '#b08bda',
    status: 'pending',
    date: today,
    content: 'Technical interview with 1 Thing. Review resume and prepare questions.',
  },
  {
    id: '4',
    title: 'Pick Up my Dog',
    time: '6:00 pm',
    location: 'Hello World Vet',
    color: '#8ca9ff',
    status: 'pending',
    date: today,
    content: 'Pick up my dog from the veterinary clinic after the checkup.',
  },
  {
    id: '5',
    title: 'Party',
    time: '9:00 pm',
    location: "Momo's House",
    color: '#4c9fd4',
    status: 'pending',
    date: today,
    content: 'Attend birthday party at Momo’s house with friends.',
  },
  {
    id: '6',
    title: 'Walk My Dog',
    time: '7:00 am',
    location: 'Dog Park',
    color: '#888888',
    status: 'completed',
    date: today,
    content: 'Morning walk with my dog at the neighborhood dog park.',
  },
  {
    id: '7',
    title: 'Get on My Car',
    time: '8:30 am',
    location: 'Parking Lot',
    color: '#888888',
    status: 'completed',
    date: today,
    content: 'Pick up my car from the parking lot after servicing.',
  },
  {
    id: '8',
    title: 'Submit Project',
    time: '11:00 am',
    location: '',
    color: '#8ca9ff',
    status: 'pending',
    date: addDays(today, 2),
    content: 'Submit the final project report to the supervisor.',
  },
  {
    id: '9',
    title: 'Yoga Class',
    time: '5:30 pm',
    location: 'Gym Center',
    color: '#b08bda',
    status: 'pending',
    date: addDays(today, 3),
    content: 'Evening yoga class at the gym for relaxation and fitness.',
  },
  {
    id: '10',
    title: 'Call Mom',
    time: '7:00 pm',
    location: '',
    color: '#4c9fd4',
    status: 'completed',
    date: addDays(today, 4),
    content: 'Weekly catch-up call with mom to share updates.',
  },
  {
    id: '11',
    title: 'Read a Book',
    time: '8:00 pm',
    location: '',
    color: '#888888',
    status: 'completed',
    date: addDays(today, 5),
    content: 'Read 50 pages of \"Atomic Habits\" for personal development.',
  },
  {
    id: '12',
    title: 'Doctor Appointment',
    time: '3:00 pm',
    location: 'Clinic',
    color: '#8ca9ff',
    status: 'pending',
    date: addDays(today, 6),
    content: 'Annual physical check-up appointment at the local clinic.',
  },
  {
    id: '13',
    title: 'Shopping',
    time: '1:00 pm',
    location: 'Mall',
    color: '#4c9fd4',
    status: 'pending',
    date: addDays(today, -2),
    content: 'Buy groceries and supplies from the mall.',
  },
  {
    id: '14',
    title: 'Dentist Visit',
    time: '10:00 am',
    location: 'Dental Office',
    color: '#b08bda',
    status: 'pending',
    date: addDays(today, -3),
    content: 'Teeth cleaning appointment at the dentist.',
  },
  {
    id: '15',
    title: 'Morning Run',
    time: '6:00 am',
    location: 'Park',
    color: '#8ca9ff',
    status: 'completed',
    date: addDays(today, -5),
    content: '5km early morning run in the park.',
  },
  {
    id: '16',
    title: 'Grocery Shopping',
    time: '4:00 pm',
    location: '',
    color: '#4c9fd4',
    status: 'pending',
    date: addDays(today, -6),
    content: 'Stock up on vegetables and fruits for the week.',
  },
  {
    id: '17',
    title: 'Business Trip',
    time: '8:00 am',
    location: 'Airport',
    color: '#888888',
    status: 'completed',
    date: addDays(today, 10),
    content: 'Fly to New York for client meeting and presentations.',
  },
  {
    id: '18',
    title: 'Car Service',
    time: '10:30 am',
    location: 'Service Center',
    color: '#b08bda',
    status: 'pending',
    date: addDays(today, 12),
    content: 'Take the car for scheduled maintenance service.',
  },
  {
    id: '19',
    title: 'Team Lunch',
    time: '12:30 pm',
    location: 'Restaurant',
    color: '#8ca9ff',
    status: 'completed',
    date: addDays(today, 15),
    content: 'Team-building lunch with project members.',
  },
  {
    id: '20',
    title: 'Flight to LA',
    time: '6:00 am',
    location: 'Airport',
    color: '#4c9fd4',
    status: 'pending',
    date: addDays(today, -30),
    content: 'Flight to Los Angeles for vacation.',
  },
];
