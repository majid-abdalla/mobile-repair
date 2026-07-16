export const repairs = [
  {
    repairId: 1,                    
    customerName: 'Ahmed Mohamed',  
    modelName: 'Galaxy A14',        
    issueDescription: 'Screen broken', 
    status: 'Completed',            
    estimatedCost: 45.00,          
    actualCost: 45.00,
    receivedDate: '2024-01-15',
  },
]

export const customers = [
  {
    customerId: 1,                  
    fullName: 'Ahmed Mohamed',      
    phone: '0615550101',
    email: 'ahmed@example.com',
    address: 'Hodan District',
    isActive: true,
  },
]

export const payments = [
  {
    paymentId: 1,                   
    repairId: 1,
    amount: 45.00,
    paymentMethod: 'Cash',          
    paymentDate: '2024-01-15',
    receivedByName: 'Front Desk Officer',
  },
]