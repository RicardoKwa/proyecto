<?php
//src/Controller/IndexController.php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Ciudad;
use App\Entity\User;
use App\Entity\Reserva;
use App\Entity\Estancia;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;
// use App\Manager\AuthManager;

class IndexController extends AbstractController {
/**
* @Route("/inicio")
*/
public function inicio(Request $request) {
    $session = $request->getSession();
    $session->clear();
       return $this->render('proyecto.html.twig',array());
       
}
  
/**
     * @Route("/pisos", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
public function pisos(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
    $nombre = $request->query->get('ciudad');
    
    $queryId=$entityManager->createQuery("select c.idCiudad from App\Entity\Ciudad c WHERE c.nombre = :nombre");
    $queryId->setParameter('nombre', $nombre);          
    $id_ciudad = $queryId->getResult();

    $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :id_ciudad");
    $queryPisos->setParameter('id_ciudad', $id_ciudad);
    $pisos = $queryPisos->getResult();
        
    $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }
  
/**
 * @Route("/car", methods={"GET"})
 * @return JsonResponse
 * @throws \Exception
 */
public function car(EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
    $queryCar=$entityManager->createQuery("select e from App\Entity\Caracteristicas_piso e");
    $car = $queryCar->getResult();
        
    $data = $serializer->serialize($car, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }


/**
 * @Route("/reservar", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function reservar(Request $request,EntityManagerInterface $entityManager)
{   
    $session = $request->getSession();
    $data  = json_decode(file_get_contents('php://input'), true);        
    
    $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
    $estancia = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => $data['pisoId']]);
    $inicio = \DateTime::createFromFormat('Y-m-d', $data['dateIn']); 
    $fin = \DateTime::createFromFormat('Y-m-d', $data['dateFin']); 

    $reserva = new Reserva();
    $reserva->setPrecioAlquiler(200);
    $reserva->setFechaInicio($inicio);
    $reserva->setFechaFinal($fin);
    $reserva->setNumeroCuenta($data['numtarjeta']);
    $user->setTelefono($data['tel']);
    $reserva->setIdCliente($user);
    $reserva->setIdEst($estancia);

    try {
        $entityManager->persist($reserva);
        $entityManager->persist($user);
        $entityManager->flush();
    } catch (\Exception $e) {
        
        return new JsonResponse("Error", Response::HTTP_OK, [], true);

    }
    
    return new JsonResponse($reserva->getNumeroCuenta(), Response::HTTP_OK, [], true);

}


/**
     * @Route("/reservas", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getReservas(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        $session = $request->getSession();
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
    
        $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e WHERE e.idCliente = :user");
        $queryReservas->setParameter('user', $user);
        $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }

      
      

        
/**
 * @Route("/filtroPisos", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
    public function filtro(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

        $data  = json_decode(file_get_contents('php://input'), true);        
        
        $tipo = $data['tipo'];
        $ciudad = $entityManager->getRepository(Ciudad::class)->findOneBy(['nombre' => $data['city']]);
        $precio = $data['precio'];

        if($precio == "500"){
            $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :ciudad AND e.tipoEst = :tipo AND e.precioMes < 500");
        }elseif($precio == "999"){
            $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :ciudad AND e.tipoEst = :tipo AND e.precioMes < 1000");
        }elseif($precio == "1000"){
            $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :ciudad AND e.tipoEst = :tipo AND e.precioMes > 1000");
        }else{
            $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e WHERE e.idCiudad = :ciudad AND e.tipoEst = :tipo");
        }
        
        $queryPisos->setParameter('ciudad', $ciudad);
        $queryPisos->setParameter('tipo', $tipo);
        $pisos = $queryPisos->getResult();
            
        $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }




/**
 * @Route("/comprobarDisponible", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
public function disponibilidad(Request $request , EntityManagerInterface $entityManager) {
    
    $data  = json_decode(file_get_contents('php://input'), true);        
    
    $estancia = $entityManager->getRepository(Estancia::class)->findOneBy(['idEst' => $data['pisoId']]);
    $inicio = \DateTime::createFromFormat('Y-m-d', $data['dateIn']); 
    $fin = \DateTime::createFromFormat('Y-m-d', $data['dateFin']); 
    
    $reservas = $entityManager->getRepository(Reserva::class)->findBy(['idEst' => $estancia]);
    
    if (sizeof($reservas) == 0) {
        return new JsonResponse('Disponible', Response::HTTP_OK, [], true); 
    }
    else{
    
        foreach($reservas as $res)
        {   
            $t0 = $res->getFechaInicio();
            $t1 = $res->getFechaFinal();
            if($t0 <= $inicio && $t1 > $inicio || $t0 >$inicio && $t0 < $fin ){
                return new JsonResponse('No disponible', Response::HTTP_OK, [], true); 
            }    
        }
            return new JsonResponse('Disponible', Response::HTTP_OK, [], true); 

    }

    }





    /**
     * @Route("/reservascliente", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getReservasCliente(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        $id_cliente = $request->query->get('id');
            
        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $id_cliente]);
    
        $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e WHERE e.idCliente = :user");
        $queryReservas->setParameter('user', $user);
        $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
        }



}


