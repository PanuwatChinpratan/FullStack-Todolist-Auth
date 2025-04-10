import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

type Props = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export default function DeleteConfirmDialog({ open, onCancel, onConfirm, isDeleting }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={(open: boolean) => !open && onCancel()}>
      <AlertDialogContent className="bg-[var(--background)]">
        <AlertDialogHeader>
          <AlertDialogTitle>คุณแน่ใจนะว่าจะลบ?</AlertDialogTitle>
          <AlertDialogDescription>ลบจริงโดยที่ลบออกจาก DB เลย!</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'กำลังลบ...' : 'ยืนยันการลบ'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
