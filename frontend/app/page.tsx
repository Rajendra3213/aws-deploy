'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Video } from 'lucide-react'

const generateMeetLink = (name: string, date: string, time: string, service: string) => {
  const meetingTitle = `${service} - ${name}`
  const startDateTime = new Date(`${date}T${time}:00`)
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour later
  
  const googleMeetUrl = `https://meet.google.com/new`
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingTitle)}&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Meeting with ${name} for ${service}. Join via Google Meet: ${googleMeetUrl}`)}`
  
  return { meetLink: googleMeetUrl, calendarLink: calendarUrl }
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    meetingType: 'in-person'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [meetingLinks, setMeetingLinks] = useState({ meetLink: '', calendarLink: '' })

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const services = [
    'Consultation',
    'Business Meeting',
    'Personal Session',
    'Follow-up'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let links = { meetLink: '', calendarLink: '' }
    if (formData.meetingType === 'online') {
      links = generateMeetLink(formData.name, selectedDate, selectedTime, formData.service)
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          meeting_type: formData.meetingType,
          meet_link: links.meetLink
        })
      })
      
      if (response.ok) {
        setMeetingLinks(links)
        setIsSubmitted(true)
      } else {
        alert('Failed to book appointment. Please try again.')
      }
    } catch (error) {
      alert('Error booking appointment. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your appointment has been scheduled for {selectedDate} at {selectedTime}
          </p>
          
          {formData.meetingType === 'online' && meetingLinks.meetLink && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-3">Online Meeting Details</h3>
              <div className="space-y-2">
                <a 
                  href={meetingLinks.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join Google Meet
                </a>
                <a 
                  href={meetingLinks.calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Add to Calendar
                </a>
              </div>
              <p className="text-xs text-blue-600 mt-2">Meeting link will also be sent via email</p>
            </div>
          )}
          
          <button 
            onClick={() => {
              setIsSubmitted(false)
              setMeetingLinks({ meetLink: '', calendarLink: '' })
            }}
            className="btn-primary w-full"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mr-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">BookEase Pro</h1>
                <p className="text-sm text-gray-500">Professional Booking System</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h2>
            <p className="text-lg text-gray-600">
              Schedule a meeting with our professional team
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Type
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Video className="w-4 h-4 inline mr-2" />
                  Meeting Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, meetingType: 'in-person'})}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      formData.meetingType === 'in-person'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    📍 In-Person
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, meetingType: 'online'})}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      formData.meetingType === 'online'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    💻 Online Meet
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg border-2 transition-colors ${
                        selectedTime === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Appointment
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-2">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">BookEase Pro</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Trusted by 1000+ businesses worldwide</p>
              <p className="text-xs text-gray-500">Need help? Contact us at support@bookeasepro.com</p>
            </div>
            <a href="/admin/login" className="text-primary hover:underline text-sm font-medium">Business Owner? Login Here →</a>
          </div>
        </div>
      </div>
    </div>
  )
}