'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Mail, Trash2, CheckCircle, XCircle, Video } from 'lucide-react'


interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  appointment_date: string
  appointment_time: string
  meeting_type: string
  meet_link?: string
  created_at: string
  status: string
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchAppointments()
    } else {
      window.location.href = '/admin/login'
    }
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/appointments/`)
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAppointment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/appointments/${id}`, {
        method: 'DELETE'
      })
      setAppointments(appointments.filter(apt => apt.id !== id))
    } catch (error) {
      alert('Error deleting appointment')
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/appointments/${id}/status?status=${status}`, {
        method: 'PUT'
      })
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      ))
    } catch (error) {
      alert('Error updating status')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    window.location.href = '/admin/login'
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BookEase Pro</h1>
                <p className="text-sm text-gray-500">Business Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Appointment Management</h2>
            <p className="text-gray-600">Manage and track all your customer appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Appointments ({appointments.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="font-medium text-gray-900">{appointment.name}</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-500">{appointment.email}</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-500">{appointment.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {appointment.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <div className="text-sm text-gray-900">{appointment.appointment_date}</div>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <div className="text-sm text-gray-500">{appointment.appointment_time}</div>
                      </div>
                      {appointment.meeting_type === 'online' && appointment.meet_link && (
                        <div className="flex items-center mt-1">
                          <Video className="w-4 h-4 mr-2 text-blue-500" />
                          <a 
                            href={appointment.meet_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Google Meet
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {appointment.status !== 'confirmed' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {appointment.status !== 'cancelled' && (
                          <button
                            onClick={() => updateStatus(appointment.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}