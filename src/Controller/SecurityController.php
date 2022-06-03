<?php

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

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Session;
// use App\Manager\AuthManager;
class SecurityController extends AbstractController
{

 /**
 * @Route("/login", methods={"POST"})
 * @return JsonResponse
 * @throws \Exception
 */
// #[Route(path: '/login', name: 'app_login')]
public function login(Request $request , EntityManagerInterface $entityManager ,UserPasswordHasherInterface $userPasswordHasher)
 {   

    $factory = new PasswordHasherFactory([
        'common' => ['algorithm' => 'bcrypt'],
        'memory-hard' => ['algorithm' => 'sodium'],
    ]);
    $passwordHasher = $factory->getPasswordHasher('common');


    $data  = json_decode(file_get_contents('php://input'), true);

     $username = $data['email'];
     $password = $data['password'];
     
     $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $username]);
     if($user){
        
        $hash = $user->getPassword();
        // $passwordHasher->verify($hash,$password);
        if ($passwordHasher->verify($hash,$password)) {
            // error, you can't change your password 
            // throw exception or return, etc.
            $roles = $user->getRoles();
            $session = new Session();
            // $session->start();
            $session->set('email',$username);
            $session->set('id', $user->getId());
            if($roles[0] == 'ROLE_ADMIN'){
                return new JsonResponse('ADMIN', Response::HTTP_OK, [], true); 
            }elseif ($roles[0] == 'ROLE_USER') {
                return new JsonResponse($session->get('email'), Response::HTTP_OK, [], true); 
            }  
         }
        //checkPassword($password,$user);
        return new JsonResponse('PasswordError', Response::HTTP_OK, [], true); 
     }else{
        return new JsonResponse('UserError', Response::HTTP_OK, [], true); 
     }

    
 }


    // #[Route(path: '/login', name: 'app_login')]
    // public function login(Request $request, SessionInterface $session)
    // {
    //     //$password = $request->get('password');
    //     $email = $request->get('email');

    //     if (!$name || !$email) {
    //         return new Response('Data is not provided', 500);
    //     }

    //     /** @var User $user */
    //     $user = $this->getDoctrine()
    //         ->getRepository(User::class)
    //         ->findOneBy([
    //             'email' => $email
    //         ]);

    //     if (!$user) {
    //         return new Response('Wrong parameters', 500);
    //     }

    //     $session->set('user_id', $user->getId());

    //     // TODO: add event for auth user user.auth.after

    //     return new JsonResponse($user->toArray());
    // }


    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }


#[Route(path: '/check', name: 'app_check')]
public function check(Request $request , EntityManagerInterface $entityManager):JsonResponse
 {   
    $session = $request->getSession();


    if($session->get('email')){     
        return new JsonResponse($session->get('email'), Response::HTTP_OK, [], true); 
    }else{
        return new JsonResponse("False", Response::HTTP_OK, [], true);
    }


    
    
    
 }

}
