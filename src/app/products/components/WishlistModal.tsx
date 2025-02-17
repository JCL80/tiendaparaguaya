interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-medium mb-4">¿Qué es una lista de deseos?</h2>
        <p className="text-sm text-gray-600">
          Una lista de deseos es una forma de guardar tus productos favoritos para comprarlos más tarde. 
          Puedes agregar cualquier producto a tu lista de deseos y regresar a ellos cuando estés listo 
          para completar tu compra. ¡Es una herramienta útil para planificar tus compras!
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Además, podemos ayudarte a encontrar productos similares a los que has agregado a tu lista de deseos. 
          ¿Te gustaría explorar estas recomendaciones personalizadas?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
          >
            Cerrar
          </button>
          {/* <button
            className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
          >
            Explorar recomendaciones
          </button> */}
        </div>
      </div>
    </div>
  );
}
