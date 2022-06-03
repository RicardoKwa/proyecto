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


class AdminController extends AbstractController {

/**
     * @Route("/reservasAdmin", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function getAllReservas(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    
        // $session = $request->getSession();
        // $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $session->get('email')]);
        
        $reservas = $entityManager->getRepository(Reserva::class)->findAll();
        // $queryReservas=$entityManager->createQuery("select e from App\Entity\Reserva e");
        // $reservas = $queryReservas->getResult();
            
        $data = $serializer->serialize($reservas, JsonEncoder::FORMAT);
        return new JsonResponse($data, Response::HTTP_OK, [], true); 
    }



/**
* @Route("/pisosAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllpisos(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

    $pisos = $entityManager->getRepository(Estancia::class)->findAll();
    // $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e");
    // $pisos = $queryPisos->getResult();
        
    $data = $serializer->serialize($pisos, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}

/**
* @Route("/clientesAdmin", methods={"GET"})
* @param Request $request
* @return JsonResponse
* @throws \Exception
*/
public function getAllUser(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
    

    $Users = $entityManager->getRepository(User::class)->findAll();
    // $queryPisos=$entityManager->createQuery("select e from App\Entity\Estancia e");
    // $pisos = $queryPisos->getResult();
    // foreach ($Users as $user) {
    //     // $rol = $user->getRoles();
    //     // if($rol[0] == 'ROLE_ADMIN'){
    //     unset($user);
    //     // }
    // }
        
    $data = $serializer->serialize($Users, JsonEncoder::FORMAT);
    return new JsonResponse($data, Response::HTTP_OK, [], true); 
}


/**
     * @Route("/deletecliente", methods={"POST"}) 
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteCliente(EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $input  = json_decode(file_get_contents('php://input'), true);             
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $input['email']);
                
        $entityManager->remove($user);
        $entityManager->flush();
        
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
        return new JsonResponse('Usuario : ' + $input['email'] + 'eliminado', Response::HTTP_OK, [], true); 

    }

    /**
     * @Route("/deletereserva", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deleteCliente(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_reserva = $request->query->get('id');
        // $input  = json_decode(file_get_contents('php://input'), true);             
        $reserva = $entityManager->getRepository(Reserva::class)->findOneBy(['id' => $id_reserva);
        // if ($reserva != null){
        $entityManager->remove($reserva);
        $entityManager->flush();

        return new JsonResponse('Reserva eliminada', Response::HTTP_OK, [], true);     
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
    }
  
    /**
     * @Route("/deletepiso", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deletePiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_piso = $request->query->get('id');
        // $input  = json_decode(file_get_contents('php://input'), true);             
        $piso = $entityManager->getRepository(Estancia::class)->findOneBy(['id' => $id_piso);
        // if ($reserva != null){
        $entityManager->remove($piso);
        $entityManager->flush();

        return new JsonResponse('Piso eliminado', Response::HTTP_OK, [], true);     
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
    }
    
    /**
     * @Route("/deletepiso", methods={"GET"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function deletePiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $id_piso = $request->query->get('id');
        // $input  = json_decode(file_get_contents('php://input'), true);             
        $piso = $entityManager->getRepository(Estancia::class)->findOneBy(['id' => $id_piso);
        // if ($reserva != null){
        $entityManager->remove($piso);
        $entityManager->flush();

        return new JsonResponse('Piso eliminado', Response::HTTP_OK, [], true);     
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
    }

/**
     * @Route("/newpiso", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function editPiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $data  = json_decode(file_get_contents('php://input'), true);  

        $piso = new Estancia();

        $piso->setTipoEst($data['tipo']);
        $piso->setPrecioMes($data['precio-mes']);
        $piso->setFianza($data['fianza']);
        $piso->setDireccion($data['direccion']);
        $piso->setIdCar($data['car']);
        $piso->setIdReg($data['reglas']);
        
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('Piso creado', Response::HTTP_OK, [], true);     
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
    }

    
    /**
     * @Route("/editpiso", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function editPiso(Request $request , EntityManagerInterface $entityManager , SerializerInterface $serializer ) {
        
        $data  = json_decode(file_get_contents('php://input'), true);  

        $piso = $piso = $entityManager->getRepository(Estancia::class)->findOneBy(['id' => $data['id']);

        $piso->setTipoEst($data['tipo']);
        $piso->setPrecioMes($data['precio-mes']);
        $piso->setFianza($data['fianza']);
        $piso->setDireccion($data['direccion']);
        $piso->setIdCar($data['car']);
        $piso->setIdReg($data['reglas']);
        
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse('Piso editado', Response::HTTP_OK, [], true);     
        // $data = $serializer->serialize($user, JsonEncoder::FORMAT);
    }

}

