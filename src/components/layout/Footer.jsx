export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-4 lg:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-slate-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} MobileRepairSystem. All rights reserved.</p>
        <p>Version 1.0.0</p>
      </div>
    </footer>
  )
}
