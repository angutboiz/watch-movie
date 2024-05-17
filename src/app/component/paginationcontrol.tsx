import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationControl = ({ currentPage, onPageChange }: PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <Pagination className="my-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer bg-orange-700 w-[100px]" onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive className="text-gray-700 font-bold cursor-pointer mx-3">
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className="cursor-pointer bg-orange-700 w-[100px]" onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControl;
