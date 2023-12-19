import cv2 as cv


class FilterService():
    CLAHE = 'CLAHE'
    EQUALIZE_HIST = 'EQUALIZE_HIST'
    ORIGINAL = 'ORIGINAL'

    def get_applied_clahe(self, frame):
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        clahe = cv.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        cl1 = clahe.apply(gray)
        return cl1

    def get_applied_equalize_host(self, frame):
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        equ = cv.equalizeHist(gray)
        return equ

    def get_applied_filter_frame(self, frame, filter: str):

        if (filter == FilterService.CLAHE):
            return self.get_applied_clahe(frame)
        elif (filter == FilterService.EQUALIZE_HIST):
            return self.get_applied_equalize_host(frame)
        else:
            return frame
